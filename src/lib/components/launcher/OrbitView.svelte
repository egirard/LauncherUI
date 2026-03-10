<script lang="ts">
import { Canvas, T } from "@threlte/core";
import OrbitItem from "./OrbitItem.svelte";
import OrbitSun from "./OrbitSun.svelte";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// biome-ignore lint/style/useConst: Svelte 4 props must be let
export let applications: any[] = [];

let isE2e = false;
try {
  isE2e = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
} catch (e) {}
</script>

<div class="canvas-container">
  <Canvas 
    frameloop={isE2e ? 'demand' : 'always'}
    rendererParameters={{ antialias: !isE2e, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
  >
    <T.PerspectiveCamera 
      makeDefault 
      position={[0, 8, 12]} 
      fov={45} 
      on:create={({ ref }) => {
        ref.lookAt(0, 0, 0)
      }} 
    />
    
    <!-- Base lighting so items aren't completely dark -->
    <T.AmbientLight intensity={0.4} />
    <T.DirectionalLight position={[5, 10, 5]} intensity={1} />
    
    <OrbitSun />
    
    {#if applications && applications.length > 0}
      {#each applications as app, index}
        <OrbitItem application={app} {index} total={applications.length} />
      {/each}
    {/if}
  </Canvas>
</div>

<style>
  .canvas-container {
    width: 100vw;
    height: 100vh;
    background-color: #0f1015; /* Deep space background */
    overflow: hidden;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
