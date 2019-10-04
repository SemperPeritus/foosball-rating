<script>
  import { onMount } from 'svelte';

  import { api } from '../helpers/api';

  let players;
  let isLoading = true;

  const fetchPlayers = async () => {
    isLoading = true;
    players = await api.get('player');
    isLoading = false;
  };

  onMount(fetchPlayers);

  const updateRating = async () => {
    isLoading = true;
    await api.get('player/rating');
    await fetchPlayers();
  };
</script>

<svelte:head>
  <title>Список игроков</title>
</svelte:head>

<h1>Список игроков</h1>

<button on:click={updateRating} disabled={isLoading}>Обновить рейтинг</button>

<div>
  {#if players && !isLoading}
    {#each players as { name, rating }}
      <p>{name} - {rating}</p>
    {/each}
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
