import Store, { thunk } from 'repatch';
import io from 'socket.io-client';
import { playSound } from './utils';
import { playSound as playSoundAction } from './actions';

export const socket = io(
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'http://guns.hackathon.guidesmiths.com'
);
socket.on('connect', () => {
  console.log('connect');
  socket.on('change', gameState => {
    console.log('change', gameState);
    store.dispatch(state => ({ ...state, gameState }));
  });

  socket.on('shot', ({ username, shot }) => {
    if (username !== store.getState().me) return;
    store.dispatch(playSoundAction(shot ? 'shot' : 'shutter'));
  });
});

const store = new Store({
  me: '',
  gameState: { players: [], status: 'waiting' }
}).addMiddleware(thunk.withExtraArgument({ socket, playSound }));

window.store = store;

export default store;
