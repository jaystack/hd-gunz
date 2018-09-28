import Store, { thunk } from 'repatch';
import socketIOClient from 'socket.io-client'
import { SOCKET_IO } from "./constans"

export const socket = socketIOClient(SOCKET_IO);


export default new Store({
  me: '',
  gameState: null
}).addMiddleware(thunk.withExtraArgument({socket}));
