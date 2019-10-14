<script>
  import { onMount } from 'svelte';

  import { api } from '../helpers/api';
  import { store } from '../helpers/store';
  import { setCookie } from '../helpers/cookie';

  let user;
  const unsubscribe = store.user.subscribe(value => {
    user = value;
  });

  let isLoading = false;
  let isError = false;
  let errorMessage;

  const getFormData = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    return { username, password };
  };

  const login = async () => {
    isLoading = true;
    isError = false;
    errorMessage = null;

    const data = getFormData();
    user = await api.post('user/login', data);

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

  .form__error {
    color: red;
  }
</style>

<svelte:head>
  <title>Вход</title>
</svelte:head>

<h1>Вход</h1>

<div class="form">
  <div class="form__field">
    <label class="form__field__element" for="username">Логин:</label>
    <input class="form__field__element" type="text" id="username" name="username" required maxlength="32" />
  </div>
  <div class="form__field">
    <label class="form__field__element" for="password">Пароль:</label>
    <input class="form__field__element" type="password" id="password" name="password" required maxlength="32" />
  </div>

  {#if isError}
    <div class="form__error">{errorMessage}</div>
  {/if}

  <button on:click={login} disabled={isLoading}>Войти</button>

  {#if !isError && !isLoading && user}
    <div>Вход выполнен успешно!</div>
  {/if}
</div>
