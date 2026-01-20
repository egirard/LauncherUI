<script lang="ts">
import { goto } from "$app/navigation";
import { auth } from "$lib/firebase";
import { setSignedInUser } from "$lib/launcher-store";
import {
  GoogleAuthProvider,
  type User,
  signInAnonymously,
} from "@firebase/auth";
import { Signin } from "@ourway/svelte-firebase-auth";
import type { SignedInUser } from "@ourway/svelte-firebase-auth";

const googleAuthProvider = new GoogleAuthProvider();
const isLocalEnv = import.meta.env.VITE_FIREBASE_ENV === "local";
let signInError = "";

const toSignedInUser = (user: User): SignedInUser => ({
  signedIn: true,
  uid: user.uid,
  name: user.displayName ?? "Player",
  email: user.email ?? "emulator@launcherui.local",
  photoURL: user.photoURL ?? undefined,
});

function handleUserChange(event: CustomEvent<SignedInUser>) {
  if (event.detail.signedIn) {
    setSignedInUser(event.detail);
    void goto("/launcher");
  } else {
    setSignedInUser(null);
  }
}

async function handleEmulatorSignIn() {
  signInError = "";
  try {
    const result = await signInAnonymously(auth);
    setSignedInUser(toSignedInUser(result.user));
    await goto("/launcher");
  } catch (error) {
    signInError = error instanceof Error ? error.message : "Sign-in failed.";
  }
}
</script>

<svelte:head>
  <title>Launcher Sign In</title>
</svelte:head>

<section class="signin">
  <header>
    <p class="eyebrow">Tabletop Launcher</p>
    <h1>Sign in to continue</h1>
    <p class="subtitle">Your session unlocks the launcher experience.</p>
  </header>

  {#if isLocalEnv}
    <button
      class="e2e-button"
      type="button"
      data-testid="emulator-signin"
      on:click={handleEmulatorSignIn}
    >
      Continue with Emulator
    </button>
    {#if signInError}
      <p class="error" role="alert">{signInError}</p>
    {/if}
  {:else}
    <Signin {auth} {googleAuthProvider} on:user_changed={handleUserChange} />
  {/if}
</section>

<style>
  :global(body) {
    margin: 0;
    font-family: "Courier New", Courier, monospace;
    background: #050505;
    color: #f5f5f5;
  }

  .signin {
    display: grid;
    gap: 24px;
    padding: 48px;
    max-width: 520px;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 12px;
    margin: 0 0 12px;
    color: #ffe135;
  }

  h1 {
    margin: 0 0 8px;
    font-size: 32px;
  }

  .subtitle {
    margin: 0;
    color: #9ca3af;
  }

  .e2e-button {
    align-self: flex-start;
    padding: 12px 18px;
    border-radius: 999px;
    border: 1px solid rgba(255, 225, 53, 0.6);
    background: #111111;
    color: #ffe135;
    font-size: 14px;
    cursor: pointer;
  }

  .error {
    margin: 0;
    color: #fca5a5;
  }
</style>
