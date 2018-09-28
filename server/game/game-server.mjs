import * as repatch from 'repatch';
import { setTimeout } from 'timers';

const STATUS_WAITING = 'waiting';
const STATUS_BET = 'bet';
const STATUS_BULB = 'bulb';
const STATUS_SHOOT = 'shoot';

const ACTION_RESET = 'reset';
const ACTION_REGISTER = 'register';
const ACTION_READY = 'ready';
const ACTION_BET = 'bet';
const ACTION_BETSUBMIT = 'betSubmit';
const ACTION_SHOOT = 'shoot';
const CHANGE = 'change';

const initialState = {
  players: [],
  status: STATUS_WAITING
};

const { dispatch, getState, subscribe } = new repatch.default.Store(initialState);

const getInitialPlayerstate = username => ({
  username,
  bullets: 3,
  budget: 1000,
  alive: true,
  didShoot: false,
  bet: 0,
  betSubmitted: false
});

export default async function initGameServer({ socketIo }) {
  socketIo.on('connection', socket => {
    let me;

    //console.log('connected', socket.handshake);
    socket.on('disconnect', () => console.log('disconnected'));
    socket.emit(CHANGE, getState());

    subscribe(() => {
      console.log(getState());
      socket.emit(CHANGE, getState());
    });

    socket.on(ACTION_RESET, () => {
      dispatch(() => initialState);
    });

    socket.on(ACTION_REGISTER, ({ username }) => {
      console.log(username);
      me = username;
      dispatch(state => {
        if (state.status !== STATUS_WAITING || state.players.length >= 4) {
          return state;
        }

        return {
          ...state,
          players: [...state.players, getInitialPlayerstate(username)],
          status: state.players.length === 3 ? STATUS_BET : state.status
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
            };
          })
        };
      });
    });

    socket.on(ACTION_BETSUBMIT, () => {
      dispatch(state => {
        const maxBet = state.players.reduce((max, player) => (player.bet > max ? player.bet : max));
        const nextState = {
          ...state,
          players: state.players.map(player => {
            if (player.username !== me) return player;

            return {
              ...player,
              alive: player.bet >= maxBet,
              betSubmitted: true
            };
          })
        };
        const everybodyIsReady = nextState.players.every(p => p.betSubmitted);
        if (everybodyIsReady) {
          setTimeout(() => {
            if (getState().players.every(p => p.betSubmitted))
              dispatch(state => ({
                ...state,
                status: STATUS_SHOOT
              }));
          }, 10000);
        }
        return everybodyIsReady
          ? {
              ...state,
              ...nextState,
              status: STATUS_BULB
            }
          : nextState;
      });
    });

    socket.on(ACTION_SHOOT, () => {
      const state = getState();
      const playerIndex = state.players.findIndex(p => p.username === me);
      const player = state.players[playerIndex];
      const shot = player.alive ? Math.random() < player.bullets / 6 : false;
      const nextPlayerIndex = playerIndex === state.players.length - 1 ? 0 : playerIndex + 1;

      dispatch(state => ({
        ...state,
        players: state.players.map((player, index) => {
          if (index === playerIndex)
            return {
              ...player,
              bullets: shot ? player.bullets - 1 : player.bullets,
              didShoot: true
            };
          if (index === nextPlayerIndex && shot) {
            return {
              ...player,
              alive: false
            };
          }
          return player;
        })
      }));
    });
  });
}
