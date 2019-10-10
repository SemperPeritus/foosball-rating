<script>
  import { onMount } from 'svelte';

  import { api } from '../helpers/api';
  import { store } from '../helpers/store';

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

  function setCookie(name, value, options = {}) {
    options = {
      path: '/',
      'max-age': 604800,
      ...options,
    };

    if (options.expires && options.expires.toUTCString) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += '; ' + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

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
  .error {
    color: red;
  }
</style>

<svelte:head>
  <title>Вход</title>
</svelte:head>

<h1>Вход</h1>

<div>
  <div>
    <label for="username">Логин:</label>
    <input type="text" id="username" name="username" required maxlength="32" />
  </div>
  <div>
    <label for="password">Пароль:</label>
    <input type="password" id="password" name="password" required maxlength="32" />
  </div>

  {#if isError}
    <div class="error">{errorMessage}</div>
  {/if}

  <button on:click={login} disabled={isLoading}>Войти</button>

  {#if !isError && !isLoading && user}
    <div>Вход выполнен успешно!</div>
  {/if}
</div>
