<script>
  import Game from '../components/Game.svelte';

  export let games;
  export let isLoading;
  export let highlightedPlayerId;
  export let onDelete;

  const deleteGame = id => {
    onDelete && onDelete(id);
  };
</script>

<style>
  .game-list {
    display: table;
    width: 100%;
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

  .game-list__game__created-by {
    min-width: 140px;
  }
</style>

<div class="game-list">
  {#if games && !isLoading}
    <div class="game-list__game">
      <div class="game-list__game__cell game-list__game__cell_id">ID</div>
      <div class="game-list__game__cell">Первая команда</div>
      <div class="game-list__game__cell">Вторая команда</div>
      <div class="game-list__game__cell">Дата и время</div>
      <div class="game-list__game__cell game-list__game__created-by">Кем добавлено</div>
      <div class="game-list__game__cell">Действия</div>
    </div>
    {#each games as game}
      <Game {game} {highlightedPlayerId} onDelete={() => deleteGame(game.id)} />
    {/each}
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
