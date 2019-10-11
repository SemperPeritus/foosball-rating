<script>
  export let game;
  export let highlightedPlayerId;
</script>

<style>
  .game {
    margin-top: 10px;
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
  <b>{game.id}</b>
  |
  <span class:game__winners={game.winner === 1}>
    {#each game.firstTeam as { id, firstName, secondName }, index}
      <span class:game__highlighted-player={highlightedPlayerId === id}>{secondName} {firstName}</span>
      {index === game.firstTeam.length - 1 ? '' : ', '}
    {/each}
  </span>
  vs
  <span class:game__winners={game.winner === 2}>
    {#each game.secondTeam as { id, firstName, secondName }, index}
      <span class:game__highlighted-player={highlightedPlayerId === id}>{secondName} {firstName}</span>
      {index === game.secondTeam.length - 1 ? '' : ', '}
    {/each}
  </span>
  | Дата: {new Date(game.created).toLocaleDateString('ru-RU')}
</div>
