<script>
  import { onMount } from 'svelte';

  import Game from '../../components/Game.svelte';

  import { api } from '../../helpers/api';
  import { getCookie } from '../../helpers/cookie';
  import { store } from '../../helpers/store';

  let user;
  const unsubscribe = store.user.subscribe(value => {
    user = value;
  });

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
  .form {
    display: table;
    border-spacing: 5px;
  }

  .form__field {
    display: table-row;
  }

  .form__field__element {
    display: table-cell;
  }

  .error {
    color: red;
  }
</style>

<svelte:head>
  <title>Создать игру</title>
</svelte:head>

<h1>Создать игру</h1>

<div>
  <div class="form">
    <div class="form__field">
      <span class="form__field__element">Первая команда:</span>

      <select class="form__field__element" id="player1OfTeam1">
        {#if players}
          {#each players as { id, firstName, secondName }}
            <option value={id}>{`${secondName} ${firstName}`}</option>
          {/each}
        {/if}
      </select>

      <select class="form__field__element" id="player2OfTeam1">
        {#if players}
          {#each players as { id, firstName, secondName }}
            <option value={id}>{`${secondName} ${firstName}`}</option>
          {/each}
        {/if}
      </select>
    </div>

    <div class="form__field">
      <span class="form__field__element">Вторая команда:</span>

      <select class="form__field__element" id="player1OfTeam2">
        {#if players}
          {#each players as { id, firstName, secondName }}
            <option value={id}>{`${secondName} ${firstName}`}</option>
          {/each}
        {/if}
      </select>

      <select class="form__field__element" id="player2OfTeam2">
        {#if players}
          {#each players as { id, firstName, secondName }}
            <option value={id}>{`${secondName} ${firstName}`}</option>
          {/each}
        {/if}
      </select>
    </div>

    <div class="form__field">
      <span class="form__field__element">Победители:</span>

      <select class="form__field__element" id="winner">
        <option value={1}>Первая команда</option>
        <option value={2}>Вторая команда</option>
      </select>
    </div>
  </div>

  {#if isError}
    <div class="error">
      {errorMessage && (errorMessage.message ? `${errorMessage.error}. ${errorMessage.message}.` : errorMessage)}
    </div>
  {/if}

  <button on:click={createGame} disabled={isLoading}>Создать игру</button>

  {#if !isError && !isLoading && game}
    <Game {game} highlightedPlayerId={user.id} />
  {/if}
</div>
