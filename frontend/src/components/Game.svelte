<script>
  export let game;
  export let highlightedPlayerId;

  const formatDate = dateString => {
    const date = new Date(game.created);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${date.toLocaleDateString('ru-RU')} ${hours}:${minutes}`;
  };
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
    font-weight: bold;
    color: blue;
  }

  .game__highlighted-player {
    background-color: coral;
  }
</style>

<div class="game">
  <b class="game__cell game__cell_id">{game.id}</b>
  <div class="game__cell" class:game__winners={game.winner === 1}>
    {#each game.firstTeam as { id, firstName, secondName }, index}
      <a class:game__highlighted-player={highlightedPlayerId === id} href={`/player/${id}`}>{firstName} {secondName}</a>
      {index === game.firstTeam.length - 1 ? '' : '| '}
    {/each}
  </div>
  <div class="game__cell" class:game__winners={game.winner === 2}>
    {#each game.secondTeam as { id, firstName, secondName }, index}
      <a class:game__highlighted-player={highlightedPlayerId === id} href={`/player/${id}`}>{firstName} {secondName}</a>
      {index === game.secondTeam.length - 1 ? '' : '| '}
    {/each}
  </div>
  <div class="game__cell">{formatDate(game.created)}</div>
  <div class="game__cell">
    <a href={`/user/${game.createdBy.id}`}>{game.createdBy.username}</a>
  </div>
</div>
