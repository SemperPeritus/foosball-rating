<script context="module">
  export async function preload({ params }) {
    const userId = params.id;
    return { userId };
  }
</script>

<script>
  import { onMount } from 'svelte';

  import UserRole from '../../components/UserRole.svelte';
  import PlayerLink from '../../components/PlayerLink.svelte';

  import { api } from '../../helpers/api';

  export let userId;
  let user;
  let isLoading = false;
  let player;
  $: player = user && (user.player || user.playerWanted);
  let title;
  $: title = `Пользователь${user ? ` ${user.username}` : ''}`;

  const fetchUsers = async () => {
    isLoading = true;
    user = await api.get(`user/${userId}`);
    isLoading = false;
  };

  onMount(fetchUsers);
</script>

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
    <div>
      <h3>Привязанный игрок:</h3>
      <PlayerLink {player} />
      {#if user.playerWanted}(не подтверждён){/if}
    </div>
  {:else}
    <h2>Loading...</h2>
  {/if}
</div>
