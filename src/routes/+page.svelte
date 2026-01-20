<script lang="ts">
import { goto } from "$app/navigation";
import { onMount } from "svelte";

onMount(() => {
  void goto("/signin");
});
</script>

<p>Redirecting to sign in...</p>
