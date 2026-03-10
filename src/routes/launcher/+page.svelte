<script lang="ts">
import { goto } from "$app/navigation";
import OrbitView from "$lib/components/launcher/OrbitView.svelte";
import { auth } from "$lib/firebase";
import {
  applications,
  setApplications,
  setSignedInUser,
  signedInUser,
  startApplicationsListener,
  stopApplicationsListener,
} from "$lib/launcher-store";
import { type User, onAuthStateChanged } from "@firebase/auth";
import type { SignedInUser } from "@ourway/svelte-firebase-auth";
import { onDestroy, onMount } from "svelte";

let authUnsubscribe: (() => void) | null = null;

const toSignedInUser = (user: User): SignedInUser => ({
  signedIn: true,
  uid: user.uid,
  name: user.displayName ?? "Player",
  email: user.email ?? "player@launcherui.local",
  photoURL: user.photoURL ?? undefined,
});

onMount(() => {
  authUnsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) {
      setSignedInUser(null);
      setApplications([]);
      stopApplicationsListener();
      void goto("/signin");
      return;
    }

    setSignedInUser(toSignedInUser(user));
    startApplicationsListener();
  });
});

onDestroy(() => {
  if (authUnsubscribe) {
    authUnsubscribe();
  }
  stopApplicationsListener();
});

$: displayName = $signedInUser?.name ?? "Player";
</script>

<svelte:head>
  <title>Launcher UI - Orbit</title>
</svelte:head>

<main class="launcher">
  <header class="header-overlay">
    <p class="eyebrow">Nano Banana</p>
    <h1>Launcher</h1>
    <p class="subtitle">Welcome, {displayName}. Select a game to launch.</p>
  </header>

  <OrbitView applications={$applications} />
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: "Courier New", Courier, monospace;
    background: #0f1015;
    color: #f5f5f5;
    overflow: hidden;
  }

  .launcher {
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  .header-overlay {
    position: absolute;
    top: 48px;
    left: 48px;
    z-index: 10;
    pointer-events: none;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 12px;
    margin: 0 0 12px;
    color: #edc92d;
  }

  h1 {
    margin: 0 0 8px;
    font-size: 36px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.8);
  }

  .subtitle {
    margin: 0;
    color: #9ca3af;
    text-shadow: 0 1px 2px rgba(0,0,0,0.8);
  }
</style>
