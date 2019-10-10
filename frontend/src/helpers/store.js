import { writable } from 'svelte/store';

export const store = {
  user: writable(null),
};
