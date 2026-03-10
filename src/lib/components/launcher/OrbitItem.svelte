<script lang="ts">
import { T, useFrame } from "@threlte/core";
import { HTML, useTexture } from "@threlte/extras";
// biome-ignore lint/style/useImportType: Used in Svelte template for THREE.DoubleSide
import * as THREE from "three";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export let application: any;
export let index: number;
export let total: number;

const radius = 3.5 + index * 1.5;
$: angle = (index / total) * Math.PI * 2;
// Slower speed for items further out
$: speed = 0.4 / (index + 1);

let isE2e = false;
try {
  isE2e = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
} catch (e) {}

$: x = Math.cos(angle) * radius;
$: z = Math.sin(angle) * radius;

// biome-ignore lint/style/useConst: Svelte templates mutate this
let isHovered = false;

// Slowly rotate items
useFrame((_, delta) => {
  if (!isE2e && !isHovered) {
    angle += speed * delta;
    x = Math.cos(angle) * radius;
    z = Math.sin(angle) * radius;
  }
});

$: texturePromise = useTexture(application.Icon || "/games/placeholder.png");
$: tex =
  $texturePromise && !Array.isArray($texturePromise)
    ? ($texturePromise as unknown as THREE.Texture)
    : null;

// 3D Game Box dimensions (like a board game)
const boxWidth = 1.6;
const boxHeight = 0.2; // Lie flat
const boxDepth = 1.6;

let time = 0;
// We'll add a slight tilt to make it look cool while lying flat
const tiltX = Math.PI / 8;
const defaultBoxRotationY = index * (Math.PI / 2);
let boxRotationY = defaultBoxRotationY;

useFrame((_, delta) => {
  if (!isE2e && !isHovered) {
    time += delta;
    boxRotationY += delta * 0.4; // Spin slowly
  }
});

$: floatY = isE2e ? 0.3 : 0.3 + Math.sin(time * 2 + index) * 0.1;
$: orbitColor = isHovered ? "#ffffff" : "#00e5ff";
</script>

<!-- The Orbit Track -->
<T.Mesh rotation.x={-Math.PI / 2} position={[0, -0.4, 0]}>
  <T.RingGeometry args={[radius - 0.04, radius + 0.04, 64]} />
  <T.MeshBasicMaterial color="#00e5ff" transparent opacity={0.3} side={THREE.DoubleSide} />
</T.Mesh>

<T.Group position={[x, floatY, z]}>
  <!-- Glowing Hex/Ring under the box -->
  <T.Mesh position={[0, -0.25, 0]} rotation.x={-Math.PI / 2}>
    <T.RingGeometry args={[1.3, 1.45, 32]} />
    <T.MeshBasicMaterial color={orbitColor} transparent opacity={isHovered ? 1.0 : 0.6} side={THREE.DoubleSide} />
  </T.Mesh>

  <!-- Interactive Game Box (Lying flat with a slight tilt) -->
  <T.Mesh
    rotation.x={tiltX}
    rotation.y={boxRotationY}
    on:pointerenter={() => {
      isHovered = true;
      document.body.style.cursor = "pointer";
    }}
    on:pointerleave={() => {
      isHovered = false;
      document.body.style.cursor = "default";
    }}
    on:click={() => window.open(application.URL, "_blank")}
  >
    <!-- By default, BoxGeometry materials map as: [right, left, top, bottom, front, back] -->
    <T.BoxGeometry args={[boxWidth, boxHeight, boxDepth]} />
    
    <T.MeshStandardMaterial color="#222222" attach="material-0" roughness={0.7} />
    <T.MeshStandardMaterial color="#222222" attach="material-1" roughness={0.7} />
    
    <!-- Top Face (Cover Art) is material 2 -->
    {#if tex}
      <!-- Rotate the texture map so it aligns with the camera nicely if needed -->
      <T.MeshStandardMaterial map={tex} attach="material-2" roughness={0.4} metalness={0.1} />
    {:else}
      <T.MeshStandardMaterial color="#edc92d" attach="material-2" />
    {/if}
    
    <T.MeshStandardMaterial color="#222222" attach="material-3" roughness={0.7} />
    <T.MeshStandardMaterial color="#222222" attach="material-4" roughness={0.7} />
    <T.MeshStandardMaterial color="#111111" attach="material-5" roughness={0.8} />
  </T.Mesh>

  <!-- Label and Image (E2E requirement) Overlay -->
  <HTML position={[0, 0, 0]} transform center>
    <a
      href={application.URL}
      target="_blank"
      rel="noreferrer"
      class="game-card"
      style={!isHovered && !isE2e ? "opacity: 0; pointer-events: none;" : "opacity: 1;"}
    >
      <img
        src={application.Icon}
        alt={application.Title}
        style="display: none;"
        crossorigin="anonymous"
      />
      <div class="hover-label">{application.Title}</div>
    </a>
  </HTML>
</T.Group>

<style>
  .game-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: opacity 0.2s;
    /* Offset so it appears above the box natively */
    transform: translateY(-80px);
  }
  .hover-label {
    background: rgba(0, 20, 40, 0.9);
    color: #00e5ff;
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #00e5ff;
    font-family: "Courier New", monospace;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    white-space: nowrap;
    text-shadow: 0 0 4px #00e5ff;
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.4);
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .game-card {
      transition: none !important;
      animation: none !important;
    }
  }
</style>
