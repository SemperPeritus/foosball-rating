<script context="module">
  import { getPlayer } from '../../helpers/apiHelper';
  import { isClient } from '../../helpers/isClient';

  export async function preload({ params }) {
    if (isClient()) {
      getPlayer(params.id);
      return { params };
    }
  }
</script>

<script>
  import { onMount } from 'svelte';

  import GameList from '../../components/GameList.svelte';

  import { api } from '../../helpers/api';
  import { player } from '../../helpers/store';
  import { getCookie } from '../../helpers/cookie';
  import { isPromise } from '../../helpers/isPromise';

  export let params;

  let playerTitle = '';
  player.subscribe(value => {
    if (!isPromise(value)) {
      return;
    }
    value.then(response => (playerTitle = response.firstName ? ` ${response.firstName} ${response.secondName}` : ''));
  });

  onMount(() => getPlayer(params.id));

  const deleteGame = async id => {
    const request = await api.del(`game/${id}`, getCookie('token'));
    if (request && request.affected === 1) {
      getPlayer(params.id);
    } else {
      alert(`Ошибка!\n${request.message}`);
    }
  };
</script>

<style>
  .game-list {
    margin-top: 20px;
  }
</style>

<svelte:head>
  <title>Игрок{playerTitle}</title>
</svelte:head>

{#await $player}
  <h1>Loading...</h1>
{:then player}
  {#if player}
    <h1>{`${player.firstName} ${player.secondName}`}</h1>

    <div class="rating">Рейтинг: {Math.round(player.rating)}</div>

    <h2>История игр ({player.games.length})</h2>

    <div class="game-list">
      <GameList
        games={player.games}
        isLoading={false}
        highlightedPlayerId={player && player.id}
        onDelete={deleteGame} />
    </div>
  {:else}{JSON.stringify(player)}{/if}
{:catch error}
  <div>{error}</div>
{/await}
