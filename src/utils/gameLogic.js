import { GESTURES, GAME_RULES, GAME_RESULTS } from './constants';

/**
 * Generates a random computer move
 * @returns {string} - rock, paper, or scissors
 */
export const getComputerMove = () => {
  const moves = [GESTURES.ROCK, GESTURES.PAPER, GESTURES.SCISSORS];
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
};

/**
 * Determines the winner of a round
 * @param {string} playerMove - player's gesture
 * @param {string} computerMove - computer's gesture
 * @returns {string} - 'win', 'lose', or 'draw'
 */
export const determineWinner = (playerMove, computerMove) => {
  if (playerMove === computerMove) {
    return GAME_RESULTS.DRAW;
  }

  if (GAME_RULES[playerMove] === computerMove) {
    return GAME_RESULTS.WIN;
  }

  return GAME_RESULTS.LOSE;
};

/**
 * Gets result message based on game result
 * @param {string} result - win, lose, or draw
 * @returns {string} - result message
 */
export const getResultMessage = (result) => {
  switch (result) {
    case GAME_RESULTS.WIN:
      return 'You Win! 🎉';
    case GAME_RESULTS.LOSE:
      return 'You Lose! 😢';
    case GAME_RESULTS.DRAW:
      return "It's a Draw! 🤝";
    default:
      return '';
  }
};

/**
 * Calculates win rate percentage
 * @param {number} wins 
 * @param {number} losses 
 * @param {number} draws 
 * @returns {number} - win rate percentage
 */
export const calculateWinRate = (wins, losses, draws) => {
  const total = wins + losses + draws;
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
};




