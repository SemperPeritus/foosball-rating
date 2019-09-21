import { PlayerEntity } from '../../modules/player/player.entity';
import { GameEntity, Team } from '../../modules/game/game.entity';

const getTeamRatingDiff = (game: GameEntity) => {
  const ratingOfTeam1 = game.player1OfTeam1.rating + game.player2OfTeam1.rating;
  const ratingOfTeam2 = game.player1OfTeam2.rating + game.player2OfTeam2.rating;
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
    getPlayerWithNewRating(getCurrentPlayer(players, game.player1OfTeam1), ratingDiff, game.winner === Team.first),
    getPlayerWithNewRating(getCurrentPlayer(players, game.player2OfTeam1), ratingDiff, game.winner === Team.first),
    getPlayerWithNewRating(getCurrentPlayer(players, game.player1OfTeam2), ratingDiff, game.winner === Team.second),
    getPlayerWithNewRating(getCurrentPlayer(players, game.player2OfTeam2), ratingDiff, game.winner === Team.second),
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
