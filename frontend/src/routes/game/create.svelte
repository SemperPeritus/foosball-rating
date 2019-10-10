<script>
  import { onMount } from 'svelte';

  import { api } from '../../helpers/api';
  import { getCookie } from '../../helpers/cookie';

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
      parseInt(document.getElementById('player1OfTeam1').value, 10),
      parseInt(document.getElementById('player2OfTeam1').value, 10),
    ];
    const secondTeam = [
      parseInt(document.getElementById('player1OfTeam2').value, 10),
      parseInt(document.getElementById('player2OfTeam2').value, 10),
    ];
    const winner = parseInt(document.getElementById('winner').value, 10);

    return { firstTeam, secondTeam, winner };
  };

  const createGame = async () => {
    isLoading = true;
    isError = false;
    errorMessage = null;

    const data = getFormData();
    game = await api.post('game', data, getCookie('token'));

    isLoading = false;

    if (game.code) {
      isError = true;
      errorMessage = game.message;
    }
  };

  const renderPlayers = players => players.map(player => `${player.secondName} ${player.firstName}`).join(', ');
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
        {#each players as { id, firstName, secondName }}
          <option value={id}>{`${secondName} ${firstName}`}</option>
        {/each}
      {/if}
    </select>

    <select id="player2OfTeam1">
      {#if players}
        {#each players as { id, firstName, secondName }}
          <option value={id}>{`${secondName} ${firstName}`}</option>
        {/each}
      {/if}
    </select>
  </div>

  <div>
    <span>Вторая команда:</span>

    <select id="player1OfTeam2">
      {#if players}
        {#each players as { id, firstName, secondName }}
          <option value={id}>{`${secondName} ${firstName}`}</option>
        {/each}
      {/if}
    </select>

    <select id="player2OfTeam2">
      {#if players}
        {#each players as { id, firstName, secondName }}
          <option value={id}>{`${secondName} ${firstName}`}</option>
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
    <div class="error">
      {errorMessage && (errorMessage.message ? `${errorMessage.error}. ${errorMessage.message}.` : errorMessage)}
    </div>
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
