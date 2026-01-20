// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { connectAuthEmulator, getAuth } from "@firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "@firebase/firestore";

const firebaseEnv = import.meta.env.VITE_FIREBASE_ENV ?? "production";
const isLocal = firebaseEnv === "local";

const getConfig = () => {
  if (isLocal) {
    return {
      apiKey: "demo-api-key",
      authDomain: "localhost",
      projectId: import.meta.env.VITE_FIREBASE_LOCAL_PROJECT_ID ?? "launcherui",
      storageBucket: "demo-storage",
      messagingSenderId: "demo-sender",
      appId: "demo-app",
    };
  }

  if (firebaseEnv === "staging") {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_STAGING_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_STAGING_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_STAGING_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STAGING_STORAGE_BUCKET,
      messagingSenderId: import.meta.env
        .VITE_FIREBASE_STAGING_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_STAGING_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_STAGING_MEASUREMENT_ID,
    };
  }

  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };
};

export const app = initializeApp(getConfig());
export const firestore = getFirestore(app);
export const auth = getAuth(app);

if (isLocal) {
  const firestoreHost =
    import.meta.env.VITE_EMULATOR_FIRESTORE_HOST ?? "localhost";
  const firestorePort = Number(
    import.meta.env.VITE_EMULATOR_FIRESTORE_PORT ?? 8080,
  );
  const authHost = import.meta.env.VITE_EMULATOR_AUTH_HOST ?? "localhost";
  const authPort = Number(import.meta.env.VITE_EMULATOR_AUTH_PORT ?? 9099);

  connectFirestoreEmulator(firestore, firestoreHost, firestorePort);
  connectAuthEmulator(auth, `http://${authHost}:${authPort}`, {
    disableWarnings: true,
  });
}
