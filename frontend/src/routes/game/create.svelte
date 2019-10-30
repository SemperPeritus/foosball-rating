<script>
  import { onMount } from 'svelte';
  import Select from 'svelte-select';

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

  const form = {
    player1OfTeam1: null,
    player2OfTeam1: null,
    player1OfTeam2: null,
    player2OfTeam2: null,
    winner: null,
  };
  $: playersMap = players
    ? players.map(player => ({
        value: player.id,
        label: `${player.firstName} ${player.secondName}`,
      }))
    : [];
  const winners = [{ value: 1, label: 'Первая команда' }, { value: 2, label: 'Вторая команда' }];

  const fetchPlayers = async () => {
    players = await api.get('player');
  };

  onMount(fetchPlayers);

  const getFormData = () => {
    const formData = {};
    Object.keys(form).forEach(key => {
      formData[key] = form[key] ? form[key].value : null;
    });

    const preparedForm = {
      firstTeam: [formData.player1OfTeam1, formData.player2OfTeam1],
      secondTeam: [formData.player1OfTeam2, formData.player2OfTeam2],
      winner: formData.winner,
    };

    return preparedForm;
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

  const renderPlayers = players => players.map(player => `${player.firstName} ${player.secondName}`).join(', ');
</script>

<style>
  .form {
    display: grid;
    grid-gap: 10px;
    align-items: center;
    grid-template-columns: max-content max-content max-content;
  }

  .form__element {
    display: table-cell;
    width: 200px;
    align-self: center;
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
    <span class="form__element">Первая команда:</span>

    <div class="form__element">
      <Select items={playersMap} bind:selectedValue={form.player1OfTeam1} />
    </div>
    <div class="form__element">
      <Select items={playersMap} bind:selectedValue={form.player2OfTeam1} />
    </div>

    <span class="form__element">Вторая команда:</span>

    <div class="form__element">
      <Select items={playersMap} bind:selectedValue={form.player1OfTeam2} />
    </div>
    <div class="form__element">
      <Select items={playersMap} bind:selectedValue={form.player2OfTeam2} />
    </div>

    <span class="form__element">Победители:</span>

    <div class="form__element">
      <Select items={winners} bind:selectedValue={form.winner} />
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
