import { api } from './api';
import { player as playerStore } from './store';

export const getPlayer = playerId => {
  const player = api.get(`player/${playerId}/?include=games,games.firstTeam,games.secondTeam,games.createdBy`);
  playerStore.set(player);
};
