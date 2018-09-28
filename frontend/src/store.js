import Store, { thunk } from 'repatch';
import io from 'socket.io-client';

export const socket = io('http://localhost:5000');
socket.on('connect', () => {
  console.log('connect');
  socket.on('change', gameState => {
    console.log('change', gameState);
    store.dispatch(state => ({ ...state, gameState }));
  });
  socket.emit('register', { username: 'hasyee' });
});

const store = new Store({
  me: '',
  gameState: null
}).addMiddleware(thunk.withExtraArgument({ socket }));

window.store = store;

export default store;
