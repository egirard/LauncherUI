<script lang="ts">
import { T, useFrame } from "@threlte/core";
import { HTML } from "@threlte/extras";
import { onMount } from "svelte";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export let application: any;
export let index: number;
export let total: number;

const radius = 4;
// Use index to space items evenly across the orbit, add some variation so it's not a perfect circle if wanted, but standard circle is good
let angle = (index / total) * Math.PI * 2;
// Constant speed rather than random, so even in non-E2E it looks organized, but varying slightly
const speed = 0.2 + (index % 3) * 0.05;

let isE2e = false;

onMount(() => {
  isE2e =
    new URLSearchParams(window.location.search).get("e2e") === "true" ||
    window.localStorage.getItem("e2e") === "true" ||
    window.name === "e2e";
});

let x = Math.cos(angle) * radius;
let z = Math.sin(angle) * radius;

// Slowly rotate items
useFrame((_, delta) => {
  if (!isE2e) {
    angle += speed * delta;
    x = Math.cos(angle) * radius;
    z = Math.sin(angle) * radius;
  }
});
</script>

<T.Group position={[x, 0, z]}>
  <!-- Base tile for the game -->
  <T.Mesh>
    <T.BoxGeometry args={[1.5, 1.5, 0.1]} />
    <T.MeshStandardMaterial color="#333333" />
  </T.Mesh>

  <!-- Overlay UI on top of 3D mesh -->
  <HTML transform position={[0, 0, 0.1]} scale={0.1}>
    <a href={application.URL} target="_blank" rel="noreferrer" class="game-card">
      <img src={application.Icon} alt={application.Title} crossorigin="anonymous" />
      <div class="title">{application.Title}</div>
    </a>
  </HTML>
</T.Group>

<style>
  .game-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid #edc92d; /* nano banana yellow */
    border-radius: 8px;
    padding: 10px;
    width: 120px;
    height: 120px;
    text-decoration: none;
    color: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.5);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .game-card:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 12px #edc92d80;
    border-color: white;
  }
  .game-card img {
    width: 64px;
    height: 64px;
    object-fit: contain;
    margin-bottom: 8px;
    border-radius: 4px;
  }
  .title {
    font-size: 14px;
    font-family: sans-serif;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
</style>
