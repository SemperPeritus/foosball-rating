<script>
  import { onMount } from 'svelte';

  import { api } from '../../helpers/api';
  import { getCookie } from '../../helpers/cookie';

  let player;
  let isLoading = false;
  let isError = false;
  let errorMessage;

  const getFormData = () => {
    const firstName = document.getElementById('firstName').value;
    const secondName = document.getElementById('secondName').value;

    return { firstName, secondName };
  };

  const createPlayer = async () => {
    isLoading = true;
    isError = false;
    errorMessage = null;

    const data = getFormData();
    player = await api.post('player', data, getCookie('token'));

    isLoading = false;

    if (player.code) {
      isError = true;
      errorMessage = player.message;
    }
  };
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

  .player {
    margin-top: 16px;
  }
</style>

<svelte:head>
  <title>Добавить игрока</title>
</svelte:head>

<h1>Добавить игрока</h1>

<div>
  <div class="form">
    <div class="form__field">
      <label class="form__field__element" for="firstName">Имя:</label>
      <input class="form__field__element" type="text" id="firstName" name="firstName" required maxlength="32" />
    </div>
    <div class="form__field">
      <label class="form__field__element" for="secondName">Фамилия:</label>
      <input class="form__field__element" type="text" id="secondName" name="secondName" required maxlength="32" />
    </div>
  </div>

  {#if isError}
    <div class="error">
      {errorMessage && (errorMessage.message ? `${errorMessage.error}. ${errorMessage.message}.` : errorMessage)}
    </div>
  {/if}

  <button on:click={createPlayer} disabled={isLoading}>Добавить</button>

  {#if !isError && !isLoading && player}
    <div class="player">
      <a href={`/player/${player.id}`}>{`${player.firstName} ${player.secondName}`}</a>
      - {Math.round(player.rating)}
    </div>
  {/if}
</div>
