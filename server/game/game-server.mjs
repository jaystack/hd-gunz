import { stat } from "fs";

export const STATUS_WAITING = 'waiting';
export const STATUS_BET = 'bet';
export const STATUS_BULB = 'bulb';
export const STATUS_SHOOT = 'shoot';

export const ACTION_REGISTER = 'register';
export const ACTION_READY = 'ready';
export const ACTION_BET = 'bet';
export const ACTION_BETSUBMIT = 'betSubmit';
export const ACTION_SHOOT = 'shoot';

export const CHANGE = 'change';

const getInitialPlayerstate = username => ({
  username,
  bullets: 3,
  budget: 1000,
  alive: true,
  didShoot: false,
  bet: 0,
  betSubmitted: false
});

export default async function initGameServer({ socketIo, store: { dispatch, getState, subscribe } }) {
  socketIo.on('connection', socket => {
    let me;

    //console.log('connected', socket.handshake);
    socket.on('disconnect', () => console.log('disconnected'));
    socket.emit(CHANGE, getState());

    subscribe(() => {
      socket.emit(CHANGE, getState());
    });

    socket.on(ACTION_REGISTER, ({ username }) => {
      me = username;
      dispatch(state => {
        if (state.status !== STATUS_WAITING || state.players.length >= 4) {
          return state;
        }
        return {
          ...state,
          players: [...state.players, getInitialPlayerstate(username)]
        };
      });
    });

    socket.on(ACTION_READY, () => {
      dispatch(state => ({ ...state, status: STATUS_BET }));
    });

    socket.on(ACTION_BET, ({ amount }) => {
      dispatch(state => {
        return {
          ...state,
          players: state.players.map(player => {
            return {
              ...player,
              budget: player.username === me ? player.budget - amount : player.budget,
              bet: player.username === me ? player.bet + amount : player.bet,
              betSubmitted: false
            }
          })
        }
      });
    });

    socket.on(ACTION_BETSUBMIT, () => {
      dispatch(state => {
        let maxBet = state.players.reduce((max, player) => player.bet > max ? player.bet : max, 0);
        return {
          ...state,
          players: state.players.map(player => {
            if (player.username !== me) return player;

            return {
              ...player,
              alive: player.bet === maxBet,
              betSubmitted: true
            }
          })
        }
      })
    });

    socket.on(ACTION_SHOOT, () => {});
  });
}
