<script>
  import { onMount } from 'svelte';

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

    const playerWanted = Number.parseInt(document.getElementById('playerWanted').value, 10);

    const firstName = document.getElementById('firstName').value;
    const secondName = document.getElementById('secondName').value;

    let data = { username, password };

    if (playerWanted === 'none') {
      data = { ...data, firstName, secondName };
    } else {
      data = { ...data, playerWanted };
    }

    return data;
  };

  const login = async () => {
    isLoading = true;
    isError = false;
    errorMessage = null;

    if (!isFormValid()) {
      return false;
    }

    const data = getFormData();
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
  .error {
    color: red;
  }

  .player-form-list {
    display: flex;
  }
</style>

<svelte:head>
  <title>Регистрация</title>
</svelte:head>

<h1>Регистрация</h1>

<div>
  <div>
    <label for="username">Логин:</label>
    <input type="text" id="username" name="username" required maxlength="16" />
  </div>
  <div>
    <label for="password">Пароль:</label>
    <input type="password" id="password" name="password" required maxlength="16" />
  </div>
  <div>
    <label for="passwordAgain">Подтвердите пароль:</label>
    <input type="password" id="passwordAgain" name="passwordAgain" required maxlength="16" />
  </div>
  <span>Выберите или создайте нового игрока</span>
  <div class="player-form-list">
    <div>
      <label for="playerWanted">Существующий игрок:</label>
      <select id="playerWanted">
        <option value="none">Новый игрок</option>
        {#if players}
          {#each players as { id, firstName, secondName }}
            <option value={id}>{`${secondName} ${firstName}`}</option>
          {/each}
        {/if}
      </select>
    </div>
    <div>
      <div>
        <label for="firstName">Имя:</label>
        <input type="text" id="firstName" name="firstName" required maxlength="32" />
      </div>
      <div>
        <label for="secondName">Фамилия:</label>
        <input type="text" id="secondName" name="secondName" required maxlength="32" />
      </div>
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
