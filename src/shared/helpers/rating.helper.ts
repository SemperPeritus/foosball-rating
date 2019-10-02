import { PlayerEntity } from '../../modules/player/player.entity';
import { GameEntity, Team } from '../../modules/game/game.entity';

const getTeamRatingDiff = (game: GameEntity) => {
  const ratingOfTeam1 = game.players[0].rating + game.players[1].rating;
  const ratingOfTeam2 = game.players[2].rating + game.players[3].rating;
  return Math.abs(ratingOfTeam1 - ratingOfTeam2);
};

const getPlayerWithNewRating = (player: PlayerEntity, teamRatingDiff: number, isWinner: boolean): PlayerEntity => {
  return {
    ...player,
    rating: player.rating + (isWinner ? teamRatingDiff + 10 : -teamRatingDiff - 10),
  };
};

const getCurrentPlayer = (array: PlayerEntity[], player: PlayerEntity) =>
  array.find(element => element.id === player.id);

const getPlayersAfterGame = (players: PlayerEntity[], game: GameEntity): PlayerEntity[] => {
  const ratingDiff = getTeamRatingDiff(game);
  return [
    getPlayerWithNewRating(getCurrentPlayer(players, game.players[0]), ratingDiff, game.winner === Team.first),
    getPlayerWithNewRating(getCurrentPlayer(players, game.players[1]), ratingDiff, game.winner === Team.first),
    getPlayerWithNewRating(getCurrentPlayer(players, game.players[2]), ratingDiff, game.winner === Team.second),
    getPlayerWithNewRating(getCurrentPlayer(players, game.players[3]), ratingDiff, game.winner === Team.second),
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
