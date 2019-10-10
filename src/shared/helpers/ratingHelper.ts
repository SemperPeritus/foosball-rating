import { PlayerEntity } from '../../modules/player/player.entity';
import { GameEntity, Team } from '../../modules/game/game.entity';

const getTeamRating = (players: PlayerEntity[], team: PlayerEntity[]) =>
  team
    .map(oldPlayer => players.find(newPlayer => newPlayer.id === oldPlayer.id).rating)
    .reduce((sum, playerRating) => sum + playerRating, 0);

const getTeamRatingDiff = (players: PlayerEntity[], game: GameEntity) => {
  const firstTeamRating = getTeamRating(players, game.firstTeam);
  const secondTeamRating = getTeamRating(players, game.secondTeam);

  return firstTeamRating - secondTeamRating;
};

const getPlayerWithNewRating = (
  player: PlayerEntity,
  teamRatingDiff: number,
  isWinner: boolean,
  isFirstTeam: boolean,
): PlayerEntity => {
  let ratingDiff;
  if (isWinner) {
    const teamImpact = (isFirstTeam ? -teamRatingDiff : teamRatingDiff) / 30;
    ratingDiff = Math.max(Math.min(teamImpact + 10, 30), 5);
  } else {
    const teamImpact = (isFirstTeam ? teamRatingDiff : -teamRatingDiff) / 30;
    ratingDiff = Math.max(Math.min(teamImpact - 10, -5), -20);
  }

  return {
    ...player,
    rating: player.rating + ratingDiff,
  };
};

const getCurrentPlayer = (currentPlayers: PlayerEntity[], oldPlayer: PlayerEntity) =>
  currentPlayers.find(element => element.id === oldPlayer.id);

const getPlayersAfterGame = (players: PlayerEntity[], game: GameEntity): PlayerEntity[] => {
  const ratingDiff = getTeamRatingDiff(players, game);

  return [
    ...game.firstTeam.map(oldPlayer =>
      getPlayerWithNewRating(getCurrentPlayer(players, oldPlayer), ratingDiff, game.winner === Team.first, true),
    ),
    ...game.secondTeam.map(oldPlayer =>
      getPlayerWithNewRating(getCurrentPlayer(players, oldPlayer), ratingDiff, game.winner === Team.second, false),
    ),
  ];
};

export const getRatingForPlayers = (players: PlayerEntity[], games: GameEntity[]) => {
  return games.reduce((playersAccumulator, game) => {
    const playersAfterGame = getPlayersAfterGame(playersAccumulator, game);

    playersAfterGame.forEach(playerAfterGame => {
      const currentPlayerIndex = playersAccumulator.findIndex(player => player.id === playerAfterGame.id);
      playersAccumulator[currentPlayerIndex] = playerAfterGame;
    });

    return playersAccumulator;
  }, players);
};
