<script context="module">
  export async function preload({ params }) {
    const userId = params.id;
    return { userId };
  }
</script>

<script>
  import { onMount } from 'svelte';

  import UserRole from '../../../components/UserRole.svelte';
  import PlayerLink from '../../../components/PlayerLink.svelte';

  import { api } from '../../../helpers/api';
  import { getCookie } from '../../../helpers/cookie';
  import { RolesArray } from '../../../constants/roles';

  export let userId;
  let user;
  let isLoading = false;
  let isSaving = false;
  let title;
  $: title = `Редактирование пользователя${user ? ` ${user.username}` : ''}`;
  let form = {
    role: null,
  };

  const fetchUser = async () => {
    isLoading = true;
    user = await api.get(`user/${userId}`);

    form.role = user.role.toString();

    isLoading = false;
  };

  onMount(fetchUser);

  const saveRole = async () => {
    const role = Number.parseInt(form.role, 10);

    isLoading = true;
    user = await api.patch(`user/${userId}`, { role }, getCookie('token'));
    isLoading = false;
  };
</script>

<style>
  .edit-block {
    margin-top: 10px;
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<h1>
  {title} (
  <UserRole role={user && user.role} />
  )
</h1>

<div>
  {#if user && !isLoading}
    <div class="edit-block">
      <label class="form__field__element" for="role">
        <h3>Роль:</h3>
      </label>
      <select class="player-linking__form__field__element" id="role" bind:value={form.role}>
        {#each RolesArray as role}
          <option value={role.privileges}>{role.title}</option>
        {/each}
      </select>
      <br />
      <button on:click={saveRole}>Сохранить</button>
    </div>

    <div class="edit-block">
      <h3>Привязанный игрок:</h3>
      {#if user.player}
        <PlayerLink player={user.player} withId={true} />
      {/if}
    </div>

    <div class="edit-block">
      <h3>Желанный игрок:</h3>
      {#if user.playerWanted}
        <PlayerLink player={user.playerWanted} withId={true} />
      {/if}
    </div>
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
