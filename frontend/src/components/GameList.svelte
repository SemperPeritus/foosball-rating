<script>
  import Game from '../components/Game.svelte';

  export let games;
  export let isLoading;
  export let highlightedPlayerId;
</script>

<style>
  .game-list {
    display: table;
    border-collapse: collapse;
    border-spacing: 10px;
  }

  .game-list__game {
    display: table-row;
    padding: 10px;
    border-bottom: 2px solid #555;
  }

  .game-list__game__cell {
    display: table-cell;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
  }

  .game-list__game__cell_id {
    min-width: 30px;
  }
</style>

<div class="game-list">
  {#if games && !isLoading}
    <div class="game-list__game">
      <div class="game-list__game__cell game-list__game__cell_id">ID</div>
      <div class="game-list__game__cell">Первая команда</div>
      <div class="game-list__game__cell">Вторая команда</div>
      <div class="game-list__game__cell">Дата</div>
    </div>
    {#each games as game}
      <Game {game} {highlightedPlayerId} />
    {/each}
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
