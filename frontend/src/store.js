import Store, { thunk } from 'repatch';
import io from 'socket.io-client';

export const socket = io('http://localhost:5000');
socket.on('connect', () => {
  console.log('connect');
  socket.emit('reset');
  socket.on('change', gameState => {
    console.log('change', gameState);
    store.dispatch(state => ({ ...state, gameState }));
  });
});

const store = new Store({
  me: '',
  gameState: { players: [], status: 'waiting' }
}).addMiddleware(thunk.withExtraArgument({ socket }));

window.store = store;

export default store;
