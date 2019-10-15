<script>
  export let user;
</script>

<style>
  .rating {
    font-weight: bold;
  }
</style>

{#if user && (user.player || user.playerWanted)}
  <span class="rating">
    ({Math.round(user.player ? user.player.rating : user.playerWanted.rating)}{user.player ? '' : '?'})
  </span>
{/if}
