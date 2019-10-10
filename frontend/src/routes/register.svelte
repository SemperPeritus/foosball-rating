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
    const firstName = document.getElementById('firstName').value;
    const secondName = document.getElementById('secondName').value;

    return { username, password, firstName, secondName };
  };

  const login = async () => {
    isLoading = true;
    isError = false;
    errorMessage = null;

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
</style>

<svelte:head>
  <title>Регистрация</title>
</svelte:head>

<h1>Регистрация</h1>

<div>
  <div>
    <label for="username">Логин:</label>
    <input type="text" id="username" name="username" required maxlength="32" />
  </div>
  <div>
    <label for="password">Пароль:</label>
    <input type="password" id="password" name="password" required maxlength="32" />
  </div>
  <div>
    <label for="firstName">Имя:</label>
    <input type="text" id="firstName" name="firstName" required maxlength="32" />
  </div>
  <div>
    <label for="secondName">Фамилия:</label>
    <input type="text" id="secondName" name="secondName" required maxlength="32" />
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
