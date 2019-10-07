<script>
  import { onMount } from 'svelte';

  import { api } from '../../helpers/api';

  let players;
  let game;
  let isLoading = false;
  let isError = false;
  let errorMessage;

  const fetchPlayers = async () => {
    players = await api.get('player');
  };

  onMount(fetchPlayers);

  const getFormData = () => {
    const firstTeam = [
      parseInt(document.getElementById('player1OfTeam1').value),
      parseInt(document.getElementById('player2OfTeam1').value),
    ];
    const secondTeam = [
      parseInt(document.getElementById('player1OfTeam2').value),
      parseInt(document.getElementById('player2OfTeam2').value),
    ];
    const winner = parseInt(document.getElementById('winner').value);

    return { firstTeam, secondTeam, winner };
  };

  const createGame = async () => {
    isLoading = true;
    isError = false;
    errorMessage = null;

    const data = getFormData();
    game = await api.post('game', data);

    isLoading = false;

    if (game.code) {
      isError = true;
      errorMessage = game.message;
    }
  };

  const renderPlayers = players => players.map(player => player.name).join(', ');
</script>

<style>
  .error {
    color: red;
  }

  .winners {
    color: blue;
    font-weight: bold;
  }
</style>

<svelte:head>
  <title>Создать игру</title>
</svelte:head>

<h1>Создать игру</h1>

<div>
  <div>
    <span>Первая команда:</span>

    <select id="player1OfTeam1">
      {#if players}
        {#each players as { id, name }}
          <option value={id}>{name}</option>
        {/each}
      {/if}
    </select>

    <select id="player2OfTeam1">
      {#if players}
        {#each players as { id, name }}
          <option value={id}>{name}</option>
        {/each}
      {/if}
    </select>
  </div>

  <div>
    <span>Вторая команда:</span>

    <select id="player1OfTeam2">
      {#if players}
        {#each players as { id, name }}
          <option value={id}>{name}</option>
        {/each}
      {/if}
    </select>

    <select id="player2OfTeam2">
      {#if players}
        {#each players as { id, name }}
          <option value={id}>{name}</option>
        {/each}
      {/if}
    </select>
  </div>

  <div>
    <span>Победители:</span>

    <select id="winner">
      <option value={1}>Первая команда</option>
      <option value={2}>Вторая команда</option>
    </select>
  </div>

  {#if isError}
    <div class="error">{errorMessage}</div>
  {/if}

  <button on:click={createGame} disabled={isLoading}>Создать игру</button>

  {#if !isError && !isLoading && game}
    <div>
      <b>{game.id}</b>
      |
      <span class={game.winner === 1 ? 'winners' : ''}>{renderPlayers(game.firstTeam)}</span>
      vs
      <span class={game.winner === 2 ? 'winners' : ''}>{renderPlayers(game.secondTeam)}</span>
    </div>
  {/if}
</div>
