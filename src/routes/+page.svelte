<script lang="ts">
import { app, firestore } from "$lib/firebase";
import { initializeApp } from "@firebase/app";
import { GoogleAuthProvider, getAuth } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { Signin } from "@ourway/svelte-firebase-auth";
import type { SignedInUser } from "@ourway/svelte-firebase-auth";

const auth = getAuth(app);
// console.log("AUTH: ", auth)
const googleAuthProvider = new GoogleAuthProvider();

let uid: string | undefined = undefined;
let userId: SignedInUser | undefined = undefined;

function user(e: CustomEvent) {
  // console.log("CUSTOM EVENT: ",e);
  if (e.detail.signedIn) {
    uid = e.detail.uid;
    const userRecord = doc(firestore, `/users/${uid}`);
    setDoc(userRecord, e.detail);
    console.log("User signed in: ", e.detail);
    userId = e.detail;
  } else {
    uid = undefined;
  }
}
</script>

<h1>Welcome to Tabletop's Launcher UI</h1>
{#if uid}
    <p>Signed in as {userId?.name}</p>
    <p>Click the button below to sign out.</p>
{:else}
    <p>Please sign in.</p>
{/if}

<Signin {auth} {googleAuthProvider} on:user_changed={user} />
