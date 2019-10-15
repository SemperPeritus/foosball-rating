<script>
  import { onMount } from 'svelte';

  import GameList from '../../components/GameList.svelte';

  import { api } from '../../helpers/api';
  import { store } from '../../helpers/store';

  let user;
  const unsubscribe = store.user.subscribe(value => {
    user = value;
  });

  let games;
  let isLoading = true;

  const fetchGames = async () => {
    isLoading = true;
    games = await api.get('game?sort=created:DESC&include=firstTeam,secondTeam,createdBy');
    isLoading = false;
  };

  onMount(fetchGames);

  const updateGames = async () => {
    isLoading = true;
    await fetchGames();
  };
</script>

<style>
  .game-list {
    margin-top: 20px;
  }
</style>

<svelte:head>
  <title>Список игр</title>
</svelte:head>

<h1>Список игр</h1>

<button on:click={updateGames} disabled={isLoading}>Обновить список</button>
<a href="/game/create">
  <button>Создать игру</button>
</a>

<div class="game-list">
  <GameList {games} {isLoading} highlightedPlayerId={user && user.player && user.player.id} />
</div>
