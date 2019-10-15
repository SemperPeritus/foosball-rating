<script>
  export let player;
  export let highlightedPlayerId;
  export let withId;
</script>

<style>
  .player {
    margin-top: 8px;
  }

  .player__id {
    font-weight: bold;
  }

  .player__name_highlighted {
    background-color: coral;
  }
</style>

<div class="player">
  {#if withId}
    <span class="player__id">{player.id}</span>
  {/if}
  <a href={`/player/${player.id}`}>
    <span class:player__name_highlighted={player.id === highlightedPlayerId}>
      {`${player.secondName} ${player.firstName}`}
    </span>
  </a>
  - {Math.round(player.rating)}
</div>
