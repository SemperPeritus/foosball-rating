import { PlayerEntity } from '../../modules/player/player.entity';
import { GameEntity, Team } from '../../modules/game/game.entity';

const getTeamRatingDiff = (players: PlayerEntity[], game: GameEntity) => {
  const player1OfTeam1 = players.find(player => player.id === game.players[0].id);
  const player2OfTeam1 = players.find(player => player.id === game.players[1].id);
  const player1OfTeam2 = players.find(player => player.id === game.players[2].id);
  const player2OfTeam2 = players.find(player => player.id === game.players[3].id);

  const ratingOfTeam1 = player1OfTeam1.rating + player2OfTeam1.rating;
  const ratingOfTeam2 = player1OfTeam2.rating + player2OfTeam2.rating;

  return Math.abs(ratingOfTeam1 - ratingOfTeam2);
};

const getPlayerWithNewRating = (player: PlayerEntity, teamRatingDiff: number, isWinner: boolean): PlayerEntity => {
  return {
    ...player,
    rating:
      player.rating + (isWinner ? Math.min(teamRatingDiff + 10, 30) : Math.max(Math.min(teamRatingDiff - 10, -20))),
  };
};

const getCurrentPlayer = (array: PlayerEntity[], player: PlayerEntity) =>
  array.find(element => element.id === player.id);

const getPlayersAfterGame = (players: PlayerEntity[], game: GameEntity): PlayerEntity[] => {
  const ratingDiff = getTeamRatingDiff(players, game);
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
