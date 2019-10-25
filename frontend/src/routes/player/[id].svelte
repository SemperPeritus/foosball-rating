<script context="module">
  export async function preload({ params }) {
    return { params };
  }
</script>

<script>
  import { onMount } from 'svelte';

  import GameList from '../../components/GameList.svelte';

  import { api } from '../../helpers/api';
  import { getCookie } from '../../helpers/cookie';

  export let params;

  let player;
  let isLoading = false;

  const fetchGames = async () => {
    isLoading = true;
    player = await api.get(`player/${params.id}/?include=games,games.firstTeam,games.secondTeam,games.createdBy`);
    isLoading = false;
  };

  onMount(fetchGames);

  const deleteGame = async id => {
    const request = await api.del(`game/${id}`, getCookie('token'));
    if (request && request.affected === 1) {
      fetchGames();
    } else {
      alert(`Ошибка!\n${request.message}`);
    }
  };
</script>

<style>
  .game-list {
    margin-top: 20px;
  }
</style>

<svelte:head>
  <title>Игрок{player ? ` ${player.firstName} ${player.secondName}` : ''}</title>
</svelte:head>

{#if player}
  <h1>{`${player.firstName} ${player.secondName}`}</h1>

  <div class="rating">Рейтинг: {Math.round(player.rating)}</div>

  <h2>История игр ({player.games.length})</h2>

  <div class="game-list">
    <GameList games={player.games} {isLoading} highlightedPlayerId={player && player.id} onDelete={deleteGame} />
  </div>
{/if}
