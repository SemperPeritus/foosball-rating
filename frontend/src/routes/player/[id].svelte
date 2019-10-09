<script context="module">
  import { api } from '../../helpers/api';

  export async function preload({ params }) {
    const player = await api.get(`player/${params.id}/?include=games,games.firstTeam,games.secondTeam`);
    return { player };
  }
</script>

<script>
  export let player;

  const renderPlayers = players => players.map(player => `${player.secondName} ${player.firstName}`).join(', ');
</script>

<style>
  .rating {
    font-size: 18px;
    font-weight: bold;
  }

  .winners {
    color: blue;
    font-weight: bold;
  }
</style>

<svelte:head>
  <title>Игрок {`${player.secondName} ${player.firstName}`}</title>
</svelte:head>

<h1>{`${player.secondName} ${player.firstName}`}</h1>

<div class="rating">Рейтинг: {player.rating}</div>

<h2>История игр ({player.games.length})</h2>

<div>
  {#each player.games as { id, firstTeam, secondTeam, winner, created }}
    <p>
      <b>{id}</b>
      |
      <span class={winner === 1 ? 'winners' : ''}>{renderPlayers(firstTeam)}</span>
      vs
      <span class={winner === 2 ? 'winners' : ''}>{renderPlayers(secondTeam)}</span>
      | Дата: {new Date(created).toLocaleDateString('ru-RU')}
    </p>
  {/each}
</div>
