<script context="module">
  import GameList from '../../components/GameList.svelte';

  import { api } from '../../helpers/api';

  export async function preload({ params }) {
    const player = await api.get(`player/${params.id}/?include=games,games.firstTeam,games.secondTeam,games.createdBy`);
    return { player };
  }
</script>

<script>
  export let player;
</script>

<style>
  .game-list {
    margin-top: 20px;
  }
</style>

<svelte:head>
  <title>Игрок {`${player.secondName} ${player.firstName}`}</title>
</svelte:head>

<h1>{`${player.secondName} ${player.firstName}`}</h1>

<div class="rating">Рейтинг: {Math.round(player.rating)}</div>

<h2>История игр ({player.games.length})</h2>

<div class="game-list">
  <GameList games={player.games} isLoading={false} highlightedPlayerId={player && player.id} />
</div>
