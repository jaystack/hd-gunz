import Store, { thunk } from 'repatch';
import io from 'socket.io-client';
import { playSound } from './actions';

export const socket = io('http://192.168.3.92:5000');
socket.on('connect', () => {
  console.log('connect');
  socket.on('change', gameState => {
    console.log('change', gameState);
    store.dispatch(state => ({ ...state, gameState }));
  });

  socket.on('shot', ({ username, shot }) => {
    if (username !== store.getState().me) return;
    store.dispatch(playSound(shot ? 'shot' : 'shutter'));
  });
});

const store = new Store({
  me: '',
  gameState: { players: [], status: 'waiting' }
}).addMiddleware(thunk.withExtraArgument({ socket, playSound }));

window.store = store;

export default store;
