<script>
  import { onMount } from 'svelte';

  import PlayerLink from '../../components/PlayerLink.svelte';

  import { api } from '../../helpers/api';
  import { store } from '../../helpers/store';

  let user;
  const unsubscribe = store.user.subscribe(value => {
    user = value;
  });

  let players;
  let isLoading = true;

  const fetchPlayers = async () => {
    isLoading = true;
    players = await api.get('player?sort=rating:DESC');
    isLoading = false;
  };

  onMount(fetchPlayers);

  const updateRating = async () => {
    isLoading = true;
    players = await api.patch('player/rating');
    isLoading = false;
  };
</script>

<style>
  .player-list {
    margin-top: 20px;
  }
</style>

<svelte:head>
  <title>Список игроков</title>
</svelte:head>

<h1>Список игроков</h1>

<button on:click={updateRating} disabled={isLoading}>Пересчитать рейтинг</button>
<a href="/player/create">
  <button>Добавить игрока</button>
</a>

<div class="player-list">
  {#if players && !isLoading}
    {#each players as player}
      <PlayerLink {player} highlightedPlayerId={user && user.player && user.player.id} />
    {/each}
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
