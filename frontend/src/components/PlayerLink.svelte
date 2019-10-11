<script>
  export let player;
  export let highlightedPlayerId;
</script>

<style>
  .player {
    margin-top: 8px;
  }

  .player_highlighted {
    background-color: coral;
  }
</style>

<div class="player">
  <a href={`/player/${player.id}`}>
    <span class:player_highlighted={player.id === highlightedPlayerId}>
      {`${player.secondName} ${player.firstName}`}
    </span>
  </a>
  - {Math.round(player.rating)}
</div>
