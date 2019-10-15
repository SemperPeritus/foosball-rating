<script>
  import { Role, RolesMap } from '../constants/roles.js';

  export let role;

  $: getRoleClass = () => {
    if (role === Role.FAG) {
      return 'role role_fag';
    }

    if (role === Role.USER) {
      return 'role role_user';
    }

    if (role === Role.MODERATOR) {
      return 'role role_moderator';
    }

    if (role === Role.ADMIN) {
      return 'role role_admin';
    }

    return 'role';
  };
</script>

<style>
  .role {
    color: #888;
  }

  .role_fag {
    color: aqua;
  }

  .role_user {
    color: #555;
  }

  .role_moderator {
    color: blue;
  }

  .role_admin {
    color: red;
  }
</style>

{#if role}
  <span class={getRoleClass()}>{RolesMap[role]}</span>
{/if}
