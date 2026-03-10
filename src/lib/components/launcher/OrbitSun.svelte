<script lang="ts">
import { T, useFrame } from "@threlte/core";
import { onMount } from "svelte";

let rotation = 0;
let isE2e = false;

onMount(() => {
  isE2e =
    new URLSearchParams(window.location.search).get("e2e") === "true" ||
    window.localStorage.getItem("e2e") === "true" ||
    window.name === "e2e";
});

useFrame((_, delta) => {
  if (!isE2e) {
    rotation += 0.5 * delta;
  }
});
</script>

<T.Group rotation.y={rotation}>
  <T.Mesh>
    <!-- Center sun sphere -->
    <T.SphereGeometry args={[1.5, 32, 32]} />
    <T.MeshStandardMaterial 
      color="#edc92d" 
      emissive="#edc92d" 
      emissiveIntensity={0.5} 
      roughness={0.2} 
      metalness={0.8} 
    />
  </T.Mesh>
  <!-- Light emitting from the sun to illuminate items -->
  <T.PointLight intensity={2} color="#ffffff" distance={20} />
</T.Group>
