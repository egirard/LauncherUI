<script lang="ts">
import { app, firestore } from "$lib/firebase";
import { initializeApp } from "@firebase/app";
import { GoogleAuthProvider, getAuth } from "@firebase/auth";
import { collection, doc, onSnapshot, setDoc } from "@firebase/firestore";
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
    loadApplications();
  } else {
    uid = undefined;
  }
}
let counter = 0;

function incrementCounter() {
  counter += 1;
  console.log("Counter incremented to: ", counter);
}
function decrementCounter() {
  counter -= 1;
  console.log("Counter decremented to: ", counter);
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let ApplicationsArray: any[] = [];
// Load Application data
async function loadApplications() {
  const applicationsRef = collection(firestore, "Applications");
  // Consider adding a query if needed, e.g., where("active", "==", true)
  console.log("Loading applications from Firestore...");
  // Listen for real-time updates to the Applications collection
  onSnapshot(applicationsRef, (snapshot) => {
    for (const doc of snapshot.docs) {
      // TODO: Check for updates to existing content; need to log record Id for compare
      console.log("Application data: ", doc.data());
      ApplicationsArray.push(doc.data());
      // biome-ignore lint/correctness/noSelfAssign: <explanation>
      ApplicationsArray = ApplicationsArray; // Update the array to trigger reactivity
    }
  });
}
</script>

<h1>Welcome to Tabletop's Launcher UI</h1>
{#if uid}
  <p>Signed in as {userId?.name}</p>
  <p>The counter is currently {counter}</p>
  <button on:click={incrementCounter}>Increment Counter</button>
  <button on:click={decrementCounter}>Decrement Counter</button>
  <p>Click the button below to sign out.</p>
{:else}
  <p>Please sign in.</p>
{/if}

<Signin {auth} {googleAuthProvider} on:user_changed={user} />

<h2>Applications</h2>
{#if ApplicationsArray.length > 0}
  <ul>
    {#each ApplicationsArray as application}
      <li style="list-style-type: none; margin-bottom: 10px;">
        <a href={application.URL} target="_blank">
          <img
            src={application.Icon}
            alt={application.Title}
            style="width: 32px; height: 32px; vertical-align: middle;"
          />
        </a>
        <a href={application.URL} target="_blank"> {application.Title}</a>
      </li>
    {/each}
  </ul>
{:else}
  <p>No applications found.</p>
{/if}
