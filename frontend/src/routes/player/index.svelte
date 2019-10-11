<script>
  import { onMount } from 'svelte';

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
  .current-player {
    background-color: coral;
  }
</style>

<svelte:head>
  <title>Список игроков</title>
</svelte:head>

<h1>Список игроков</h1>

<button on:click={updateRating} disabled={isLoading}>Обновить рейтинг</button>
<a href="/player/create">
  <button>Добавить игрока</button>
</a>

<div>
  {#if players && !isLoading}
    {#each players as { id, firstName, secondName, rating }}
      <div>
        <a href={`/player/${id}`}>
          <span class={user && user.player && id === user.player.id ? 'current-player' : ''}>
            {`${secondName} ${firstName}`}
          </span>
        </a>
        - {Math.round(rating)}
      </div>
    {/each}
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
