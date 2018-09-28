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

export default async function initGameServer({ socketIo, store }) {
  socketIo.on('connection', socket => {
    //console.log('connected', socket.handshake);
    socket.on('disconnect', () => console.log('disconnected'));
    socket.emit(CHANGE, store.getState());

    store.subscribe(() => {
      socket.emit(CHANGE, store.getState());
    });

    socket.on('register', ({ username }) => {
      store.dispatch(state => {
        if (state.status !== STATUS_WAITING || state.players.length >= 4) {
          return state;
        }
        return {
          ...state,
          players: [...state.players, getInitialPlayerstate(username)]
        };
      });
    });
  });
}
