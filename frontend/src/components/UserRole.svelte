<script>
  import { Role, RolesMap } from '../constants/roles.js';

  export let role;

  const getRoleClass = () => {
    if (role === Role.FAG) {
      return 'role role_fag';
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
