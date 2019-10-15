<script>
  import { onMount } from 'svelte';

  import UserRating from '../../components/UserRating.svelte';
  import UserRole from '../../components/UserRole.svelte';

  import { api } from '../../helpers/api';
  import { store } from '../../helpers/store';

  let user;
  const unsubscribe = store.user.subscribe(value => {
    user = value;
  });

  let users;
  let isLoading = true;

  const fetchUsers = async () => {
    isLoading = true;
    users = await api.get('user');
    isLoading = false;
  };

  onMount(fetchUsers);
</script>

<style>
  .user__username {
    font-weight: bold;
  }
</style>

<svelte:head>
  <title>Список пользователей</title>
</svelte:head>

<h1>Список пользователей</h1>

<div class="player-list">
  {#if users && !isLoading}
    {#each users as user}
      <div>
        <span class="user__username">{user.username}</span>
        - <span>{user.player.secondName} {user.player.firstName}</span>
        <UserRating {user} />
        <UserRole role={user.role} />
      </div>
    {/each}
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
