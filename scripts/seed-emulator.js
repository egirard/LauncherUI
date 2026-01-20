#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId =
  process.env.VITE_FIREBASE_LOCAL_PROJECT_ID ??
  process.env.FIREBASE_PROJECT ??
  "launcherui";
const firestoreHost = process.env.VITE_EMULATOR_FIRESTORE_HOST ?? "localhost";
const firestorePort = Number(process.env.VITE_EMULATOR_FIRESTORE_PORT ?? 8080);
const seedPath =
  process.env.SEED_PATH ?? resolve(process.cwd(), "test-data", "firestore-seed.json");

process.env.FIRESTORE_EMULATOR_HOST = `${firestoreHost}:${firestorePort}`;

const app = initializeApp({ projectId });
const firestore = getFirestore(app);

const seedContents = await readFile(seedPath, "utf8");
const seedData = JSON.parse(seedContents);
const applications = Array.isArray(seedData.Applications)
  ? seedData.Applications
  : null;

if (!applications) {
  throw new Error("Seed data must include an Applications array.");
}

const chunkLimit = 400;

const commitBatch = async (batch, operations) => {
  if (operations === 0) {
    return { batch, operations };
  }
  await batch.commit();
  return { batch: firestore.batch(), operations: 0 };
};

const clearCollection = async (collectionName) => {
  const snapshot = await firestore.collection(collectionName).get();
  if (snapshot.empty) {
    return;
  }
  let batch = firestore.batch();
  let operations = 0;

  for (const docSnap of snapshot.docs) {
    batch.delete(docSnap.ref);
    operations += 1;
    if (operations >= chunkLimit) {
      ({ batch, operations } = await commitBatch(batch, operations));
    }
  }

  await commitBatch(batch, operations);
};

const writeCollection = async (collectionName, entries) => {
  let batch = firestore.batch();
  let operations = 0;

  for (const entry of entries) {
    if (!entry?.id) {
      throw new Error(`Seed entry missing id for collection ${collectionName}.`);
    }
    const { id, ...data } = entry;
    batch.set(firestore.collection(collectionName).doc(id), data);
    operations += 1;
    if (operations >= chunkLimit) {
      ({ batch, operations } = await commitBatch(batch, operations));
    }
  }

  await commitBatch(batch, operations);
};

await clearCollection("Applications");
await writeCollection("Applications", applications);

console.log(`Seeded Applications: ${applications.length}`);
