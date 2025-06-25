// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTvM7W5AYyffGsSaYYg88hnQUuHDA85Wk",
  authDomain: "launcherui.firebaseapp.com",
  projectId: "launcherui",
  storageBucket: "launcherui.firebasestorage.app",
  messagingSenderId: "952373165690",
  appId: "1:952373165690:web:e46badad1e18e85f1285c3",
  measurementId: "G-58QT3T3ZYQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);