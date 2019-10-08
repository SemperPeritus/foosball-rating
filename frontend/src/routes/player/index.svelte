<script>
  import { onMount } from 'svelte';

  import { api } from '../../helpers/api';

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

<svelte:head>
  <title>Список игроков</title>
</svelte:head>

<h1>Список игроков</h1>

<button on:click={updateRating} disabled={isLoading}>Обновить рейтинг</button>
<a href="/player/create"><button>Добавить игрока</button></a>

<div>
  {#if players && !isLoading}
    {#each players as { id, name, rating }}
      <p><a href={`/player/${id}`}>{name}</a> - {rating}</p>
    {/each}
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
