<script>
  import Game from '../components/Game.svelte';

  export let games;
  export let isLoading;
  export let highlightedPlayerId;
</script>

<div>
  {#if games && !isLoading}
    {#each games as game}
      <Game {game} {highlightedPlayerId} />
    {/each}
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
