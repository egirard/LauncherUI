<script lang="ts">
import { goto } from "$app/navigation";
import { app } from "$lib/firebase";
import {
  applications,
  setApplications,
  setSignedInUser,
  signedInUser,
  startApplicationsListener,
  stopApplicationsListener,
} from "$lib/launcher-store";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { onDestroy, onMount } from "svelte";

const auth = getAuth(app);
const isE2EBypass = import.meta.env.VITE_E2E_AUTH_BYPASS === "true";
const authRequired =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("auth") === "required";
const allowBypass = isE2EBypass && !authRequired;

let authUnsubscribe: (() => void) | null = null;

onMount(() => {
  if (allowBypass) {
    setSignedInUser({
      signedIn: true,
      uid: "e2e-user",
      name: "E2E Player",
      email: "e2e@example.com",
    });
    setApplications([]);
    return;
  }

  authUnsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) {
      void goto("/signin");
    }
  });

  startApplicationsListener();
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
  <title>Launcher UI</title>
</svelte:head>

<section class="launcher">
  <header class="hero">
    <p class="eyebrow">Nano Banana</p>
    <h1>Launcher Orbit View</h1>
    <p class="subtitle">Welcome, {displayName}. The orbit experience lands here next.</p>
  </header>

  <div class="orbit-shell" aria-hidden="true">
    <div class="sun"></div>
    <div class="orbit"></div>
  </div>

  <section class="apps">
    <h2>Available Games</h2>
    {#if $applications.length > 0}
      <ul>
        {#each $applications as application}
          <li>
            <a href={application.URL} target="_blank" rel="noreferrer">
              {#if application.Icon}
                <img src={application.Icon} alt={application.Title ?? "Game icon"} />
              {/if}
              <span>{application.Title ?? application.id}</span>
            </a>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="empty">No applications found.</p>
    {/if}
  </section>
</section>

<style>
  :global(body) {
    margin: 0;
    font-family: "Courier New", Courier, monospace;
    background: radial-gradient(circle at top, #111111, #050505 60%);
    color: #f5f5f5;
  }

  .launcher {
    display: grid;
    gap: 32px;
    padding: 48px;
  }

  .hero {
    max-width: 640px;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 12px;
    margin: 0 0 12px;
    color: #00ffcc;
  }

  h1 {
    margin: 0 0 8px;
    font-size: 36px;
  }

  .subtitle {
    margin: 0;
    color: #9ca3af;
  }

  .orbit-shell {
    position: relative;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    border: 1px dashed rgba(255, 225, 53, 0.4);
  }

  .sun {
    position: absolute;
    inset: 50% auto auto 50%;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: #ffe135;
    box-shadow: 0 0 20px rgba(255, 225, 53, 0.6);
  }

  .orbit {
    position: absolute;
    inset: 24px;
    border-radius: 50%;
    border: 1px solid rgba(0, 255, 204, 0.4);
  }

  .apps h2 {
    margin: 0 0 16px;
  }

  .apps ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 12px;
    max-width: 520px;
  }

  .apps li a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 12px;
    background: #111827;
    color: #f5f5f5;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .apps img {
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }

  .empty {
    color: #9ca3af;
  }
</style>
