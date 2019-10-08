<script>
  import { onMount } from 'svelte';

  import { api } from '../../helpers/api';

  let player;
  let isLoading = false;
  let isError = false;
  let errorMessage;

  const getFormData = () => {
    const playerName = document.getElementById('player').value;

    return { name: playerName };
  };

  const createPlayer = async () => {
    isLoading = true;
    isError = false;
    errorMessage = null;

    const data = getFormData();
    player = await api.post('player', data);

    isLoading = false;

    if (player.code) {
      isError = true;
      errorMessage = player.message;
    }
  };
</script>

<style>
  .error {
    color: red;
  }
</style>

<svelte:head>
  <title>Добавить игрока</title>
</svelte:head>

<h1>Добавить игрока</h1>

<div>
  <div>
    <label for="player">Имя:</label>
    <input type="text" id="player" name="player" required maxlength="32" />
  </div>

  {#if isError}
    <div class="error">{errorMessage}</div>
  {/if}

  <button on:click={createPlayer} disabled={isLoading}>Добавить</button>

  {#if !isError && !isLoading && player}
    <div>
      <a href={`/player/${player.id}`}>{player.name}</a> - {player.rating}
    </div>
  {/if}
</div>
