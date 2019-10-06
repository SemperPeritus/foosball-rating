<script>
  import { onMount } from 'svelte';

  import { api } from '../helpers/api';

  let games;
  let isLoading = true;

  const fetchGames = async () => {
    isLoading = true;
    games = await api.get('game?include=firstTeam,secondTeam');
    isLoading = false;
  };

  onMount(fetchGames);

  const updateGames = async () => {
    isLoading = true;
    await fetchGames();
  };

  const renderPlayers = players => players.map(player => player.name).join(', ');
</script>

<style>
  .winners {
    color: red;
  }
</style>

<svelte:head>
  <title>Список игр</title>
</svelte:head>

<h1>Список игр</h1>

<button on:click={updateGames} disabled={isLoading}>Обновить рейтинг</button>

<div>
  {#if games && !isLoading}
    {#each games as { id, firstTeam, secondTeam, winner, created }}
      <p>
        {id} |
        <span class={winner === 1 ? 'winners' : ''}>{renderPlayers(firstTeam)}</span>
        vs
        <span class={winner === 2 ? 'winners' : ''}>{renderPlayers(secondTeam)}</span>
        | Дата: {new Date(created).toLocaleDateString('ru-RU')}
      </p>
    {/each}
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
