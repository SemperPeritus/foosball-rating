<script>
  import { onMount } from 'svelte';

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

  .current-player {
    background-color: coral;
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
        <span class={winner === 1 ? 'winners' : ''}>
          {#each firstTeam as { id, firstName, secondName }, index}
            <span class={user && user.player && user.player.id === id ? 'current-player' : ''}>
              {secondName} {firstName}
            </span>
            {index === firstTeam.length - 1 ? '' : ', '}
          {/each}
        </span>
        vs
        <span class={winner === 2 ? 'winners' : ''}>
          {#each secondTeam as { id, firstName, secondName }, index}
            <span class={user && user.player && user.player.id === id ? 'current-player' : ''}>
              {secondName} {firstName}
            </span>
            {index === secondTeam.length - 1 ? '' : ', '}
          {/each}
        </span>
        | Дата: {new Date(created).toLocaleDateString('ru-RU')}
      </p>
    {/each}
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
