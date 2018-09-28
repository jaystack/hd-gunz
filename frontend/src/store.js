import Store, { thunk } from 'repatch';
import io from 'socket.io-client';

export const socket = io('http://localhost:5000');
socket.on('connect', () => {
  console.log('connect');
  socket.on('change', data => {
    console.log('change', data);
    store.dispatch(state => ({ ...state, gameState: data }));
  });
});

const store = new Store({
  me: '',
  gameState: null
}).addMiddleware(thunk.withExtraArgument({ socket }));

export default store;