import { PlayerEntity } from '../../modules/player/player.entity';
import { GameEntity, Team } from '../../modules/game/game.entity';
import { Rating } from '../constants/rating';

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

const getPlayersAfterGame = (players: PlayerEntity[], game: GameEntity): PlayerEntity[] => {
  const correctionAmount = getCorrectionAmount(players, game);
  const isNewbiesInGame = checkNewbiesInGame(players, game);

  return [
    ...game.firstTeam.map(oldPlayer =>
      getPlayerWithNewRating(
        getCurrentPlayer(players, oldPlayer),
        correctionAmount,
        game.winner === Team.first,
        isNewbiesInGame,
      ),
    ),
    ...game.secondTeam.map(oldPlayer =>
      getPlayerWithNewRating(
        getCurrentPlayer(players, oldPlayer),
        correctionAmount,
        game.winner === Team.second,
        isNewbiesInGame,
      ),
    ),
  ];
};

const checkNewbiesInGame = (players: PlayerEntity[], game: GameEntity) => {
  const actualPlayers = [
    ...game.firstTeam.map(primordialPlayer => players.find(player => player.id === primordialPlayer.id)),
    ...game.secondTeam.map(primordialPlayer => players.find(player => player.id === primordialPlayer.id)),
  ];

  return actualPlayers.some(player => player.rating === Rating.PLAYER_DEFAULT_RATING);
};

const getCurrentPlayer = (currentPlayers: PlayerEntity[], oldPlayer: PlayerEntity) =>
  currentPlayers.find(element => element.id === oldPlayer.id);

const getPlayerWithNewRating = (
  player: PlayerEntity,
  correctionAmount: number,
  isWinner: boolean,
  isNewbies: boolean,
): PlayerEntity => {
  const significanceFactor =
    player.rating === Rating.PLAYER_DEFAULT_RATING
      ? Rating.SIGNIFICANCE_FACTOR_NEWBIE
      : isNewbies
      ? Rating.SIGNIFICANCE_FACTOR_VS_NEWBIE
      : Rating.SIGNIFICANCE_FACTOR;
  const ratingDiff = correctionAmount * (isWinner ? 1 : -1) * significanceFactor;

  return {
    ...player,
    rating: player.rating + ratingDiff,
  };
};

// MAGIC! ╰(*°▽°*)╯
const getCorrectionAmount = (players: PlayerEntity[], game: GameEntity) => {
  const teamRatingDiff = getTeamRatingDiff(players, game);
  const someCrap = 1 - 1 / (Math.pow(10, teamRatingDiff) + 1);
  const crapWithFactors = someCrap * Rating.BASE_FACTOR * Rating.CONFIDENCE_FACTOR;

  return Math.round(crapWithFactors);
};

const getTeamRatingDiff = (players: PlayerEntity[], game: GameEntity) => {
  const firstTeamRating = getTeamRating(getTeam(players, game.firstTeam));
  const secondTeamRating = getTeamRating(getTeam(players, game.secondTeam));

  const dividend = game.winner === Team.first ? secondTeamRating - firstTeamRating : firstTeamRating - secondTeamRating;
  return dividend / 400;
};

const getTeamRating = (team: PlayerEntity[]) => {
  const strongestPlayerRating = Math.max.apply(Math, team.map(player => player.rating));
  const weakestPlayerRating = Math.min.apply(Math, team.map(player => player.rating));

  return (2 * strongestPlayerRating + weakestPlayerRating) / 3;
};

const getTeam = (players: PlayerEntity[], team: PlayerEntity[]): PlayerEntity[] =>
  team.map(oldPlayer => players.find(newPlayer => newPlayer.id === oldPlayer.id));
