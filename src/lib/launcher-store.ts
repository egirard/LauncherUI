import { firestore } from "$lib/firebase";
import { collection, onSnapshot } from "@firebase/firestore";
import type { Unsubscribe } from "@firebase/firestore";
import type { SignedInUser } from "@ourway/svelte-firebase-auth";
import { writable } from "svelte/store";

export interface LauncherApplication {
  id: string;
  Title?: string;
  URL?: string;
  Icon?: string;
}

export const applications = writable<LauncherApplication[]>([]);
export const signedInUser = writable<SignedInUser | null>(null);

let appsUnsubscribe: Unsubscribe | null = null;

export function startApplicationsListener() {
  if (appsUnsubscribe) {
    return appsUnsubscribe;
  }

  const applicationsRef = collection(firestore, "Applications");
  appsUnsubscribe = onSnapshot(applicationsRef, (snapshot) => {
    const nextApps = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as LauncherApplication[];
    applications.set(nextApps);
  });

  return appsUnsubscribe;
}

export function stopApplicationsListener() {
  if (appsUnsubscribe) {
    appsUnsubscribe();
    appsUnsubscribe = null;
  }
}

export function setApplications(nextApplications: LauncherApplication[]) {
  applications.set(nextApplications);
}

export function setSignedInUser(user: SignedInUser | null) {
  signedInUser.set(user);
}
