<script>
  import { onMount } from 'svelte';
  import Select from 'svelte-select';

  import { api } from '../helpers/api';
  import { store } from '../helpers/store';
  import { setCookie } from '../helpers/cookie';

  let user;
  const unsubscribe = store.user.subscribe(value => {
    user = value;
  });

  let players;
  let isLoading = false;
  let isError = false;
  let errorMessage;

  const form = {
    playerWanted: null,
  };
  $: playersMap = [
    {
      value: null,
      label: 'Новый игрок',
    },
    ...(players
      ? players.map(player => ({
          value: player.id,
          label: `${player.firstName} ${player.secondName}`,
        }))
      : []),
  ];
  $: isExistingPlayer = form.playerWanted ? form.playerWanted.value !== null : true;

  const fetchPlayers = async () => {
    players = await api.get('player');
  };

  onMount(fetchPlayers);

  const isFormValid = () => {
    const password = document.getElementById('password').value;
    const passwordAgain = document.getElementById('passwordAgain').value;

    if (password !== passwordAgain) {
      isError = true;
      errorMessage = 'Пароли не совпадают';
      return false;
    }

    return true;
  };

  const getFormData = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const playerWanted = form.playerWanted && form.playerWanted.value;

    const firstName = document.getElementById('firstName').value;
    const secondName = document.getElementById('secondName').value;

    let data = { username, password };

    if (isExistingPlayer) {
      data = { ...data, playerWanted };
    } else {
      data = { ...data, firstName, secondName };
    }

    return data;
  };

  const login = async () => {
    isError = false;
    errorMessage = null;

    if (!isFormValid()) {
      return false;
    }

    const data = getFormData();
    isLoading = true;
    user = await api.post('user/register', data);

    isLoading = false;

    if (user.code) {
      isError = true;
      errorMessage = user.message;
    }

    if (user.token) {
      setCookie('token', user.token);
      store.user.set(user);
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

  .player-linking {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .player-linking__hint {
    width: 100%;
  }

  .player-linking__form {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-gap: 10px;
    align-items: center;
  }

  .player-linking__form__element {
    display: table-cell;
    width: 200px;
  }
</style>

<svelte:head>
  <title>Регистрация</title>
</svelte:head>

<h1>Регистрация</h1>

<div>
  <div class="form">
    <div class="form__field">
      <label class="form__field__element" for="username">Логин:</label>
      <input class="form__field__element" type="text" id="username" name="username" required maxlength="16" />
    </div>
    <div class="form__field">
      <label class="form__field__element" for="password">Пароль:</label>
      <input class="form__field__element" type="password" id="password" name="password" required maxlength="16" />
    </div>
    <div class="form__field">
      <label class="form__field__element" for="passwordAgain">Подтвердите пароль:</label>
      <input
        class="form__field__element"
        type="password"
        id="passwordAgain"
        name="passwordAgain"
        required
        maxlength="16" />
    </div>
  </div>
  <div class="player-linking">
    <span class="player-linking__hint">Выберите или создайте нового игрока</span>
    <div class="player-linking__form">
      <label class="player-linking__form__element" for="playerWanted">Существующий игрок:</label>
      <div class="player-linking__form__element">
        <Select items={playersMap} bind:selectedValue={form.playerWanted} />
      </div>
      <label class="player-linking__form__element" for="firstName">Имя:</label>
      <input
        class="player-linking__form__element"
        type="text"
        id="firstName"
        name="firstName"
        required
        disabled={isExistingPlayer}
        maxlength="32" />
      <label class="player-linking__form__element" for="secondName">Фамилия:</label>
      <input
        class="player-linking__form__element"
        type="text"
        id="secondName"
        name="secondName"
        required
        disabled={isExistingPlayer}
        maxlength="32" />
    </div>
  </div>

  {#if isError}
    <div class="error">{errorMessage}</div>
  {/if}

  <button on:click={login} disabled={isLoading}>Зарегистрироваться</button>

  {#if !isError && !isLoading && user}
    <div>
      Регистрация выполнена успешно! По-умолчанию учётная запись только с правами на чтение. Для получения возможности
      добавлять игры и игроков подойти к Платону
    </div>
  {/if}
</div>
