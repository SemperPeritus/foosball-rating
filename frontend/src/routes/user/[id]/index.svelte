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
  import { store } from '../../../helpers/store';
  import { Role } from '../../../constants/roles.js';

  let role;
  const unsubscribe = store.user.subscribe(value => {
    role = value && value.role;
  });

  export let userId;
  let user;
  let isLoading = false;
  let player;
  $: player = user && (user.player || user.playerWanted);
  let title;
  $: title = `Пользователь${user ? ` ${user.username}` : ''}`;

  const fetchUser = async () => {
    isLoading = true;
    user = await api.get(`user/${userId}`);
    isLoading = false;
  };

  onMount(fetchUser);
</script>

<style>
  .header {
    display: inline-block;
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div>
  <h1 class="header">
    {title} (
    <UserRole role={user && user.role} />
    )
  </h1>
  {#if role && role >= Role.MODERATOR}
    <a href={`/user/${userId}/edit`}>Изменить</a>
  {/if}
</div>

<div>
  {#if user && !isLoading}
    <div>
      <h3>Привязанный игрок:</h3>
      <PlayerLink {player} />
      {#if user.playerWanted}(не подтверждён){/if}
    </div>
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
