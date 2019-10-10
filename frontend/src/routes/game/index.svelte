<script>
  import { onMount } from 'svelte';

  import { api } from '../../helpers/api';

  let games;
  let isLoading = true;

  const fetchGames = async () => {
    isLoading = true;
    games = await api.get('game?sort=created:DESC&include=firstTeam,secondTeam');
    isLoading = false;
  };

  onMount(fetchGames);

  const updateGames = async () => {
    isLoading = true;
    await fetchGames();
  };

  const renderPlayers = players => players.map(player => `${player.secondName} ${player.firstName}`).join(', ');
</script>

<style>
  .winners {
    color: blue;
    font-weight: bold;
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

<div>
  {#if games && !isLoading}
    {#each games as { id, firstTeam, secondTeam, winner, created }}
      <p>
        <b>{id}</b>
        |
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
