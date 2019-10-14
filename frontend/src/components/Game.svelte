<script>
  export let game;
  export let highlightedPlayerId;
</script>

<style>
  .game {
    display: table-row;
    padding: 10px;
    border-bottom: 1px solid #aaa;
  }

  .game__cell {
    display: table-cell;
    padding: 10px;
  }

  .game__cell_id {
    min-width: 30px;
  }

  .game__winners {
    color: blue;
    font-weight: bold;
  }

  .game__highlighted-player {
    background-color: coral;
  }
</style>

<div class="game">
  <b class="game__cell game__cell_id">{game.id}</b>
  <div class="game__cell" class:game__winners={game.winner === 1}>
    {#each game.firstTeam as { id, firstName, secondName }, index}
      <span class:game__highlighted-player={highlightedPlayerId === id}>{secondName} {firstName}</span>
      {index === game.firstTeam.length - 1 ? '' : '| '}
    {/each}
  </div>
  <div class="game__cell" class:game__winners={game.winner === 2}>
    {#each game.secondTeam as { id, firstName, secondName }, index}
      <span class:game__highlighted-player={highlightedPlayerId === id}>{secondName} {firstName}</span>
      {index === game.secondTeam.length - 1 ? '' : '| '}
    {/each}
  </div>
  <div class="game__cell">{new Date(game.created).toLocaleDateString('ru-RU')}</div>
</div>
