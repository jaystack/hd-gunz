
/**
 *  GameState
 *  1. waiting for players (till nuff players)
 *  2. game running
 *    - Rounds till last man standing
 *  RoundState
 *  1. (?) waiting for bids (time limit)
 *  2. round running
 *    2/a. spinning
 *    2/b. shooting
 *    3
 */
const playerReady = player => state => ({
  ...state,
  players: [...state.players, player]
})
