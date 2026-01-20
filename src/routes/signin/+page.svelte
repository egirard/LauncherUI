<script lang="ts">
import { goto } from "$app/navigation";
import { app } from "$lib/firebase";
import { setSignedInUser } from "$lib/launcher-store";
import { GoogleAuthProvider, getAuth } from "@firebase/auth";
import { Signin } from "@ourway/svelte-firebase-auth";
import type { SignedInUser } from "@ourway/svelte-firebase-auth";

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const isE2EBypass = import.meta.env.VITE_E2E_AUTH_BYPASS === "true";
const authRequired =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("auth") === "required";
const allowBypass = isE2EBypass && !authRequired;

function handleUserChange(event: CustomEvent<SignedInUser>) {
  if (event.detail.signedIn) {
    setSignedInUser(event.detail);
    void goto("/launcher");
  } else {
    setSignedInUser(null);
  }
}

function handleE2ESignIn() {
  setSignedInUser({
    signedIn: true,
    uid: "e2e-user",
    name: "E2E Player",
    email: "e2e@example.com",
  } as SignedInUser);
  void goto("/launcher");
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

  {#if allowBypass}
    <button class="e2e-button" type="button" data-testid="e2e-signin" on:click={handleE2ESignIn}>
      Continue to Launcher (E2E)
    </button>
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
</style>
