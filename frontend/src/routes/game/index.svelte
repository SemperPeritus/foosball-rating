<script>
  import { onMount } from 'svelte';

  import GameList from '../../components/GameList.svelte';

  import { api } from '../../helpers/api';
  import { store } from '../../helpers/store';
  import { getCookie } from '../../helpers/cookie';

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
  <title>Список игр</title>
</svelte:head>

<h1>Список игр</h1>

<button on:click={fetchGames} disabled={isLoading}>Обновить список</button>
<a href="/game/create">
  <button>Создать игру</button>
</a>

<div class="game-list">
  <GameList {games} {isLoading} highlightedPlayerId={user && user.player && user.player.id} onDelete={deleteGame} />
</div>
