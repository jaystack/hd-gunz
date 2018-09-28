import SocketIoServer from 'socket.io';
import initGameServer from './game/game-server.mjs';
import store from './game/store.mjs';

export default async function initSocketIoApp({ server }) {
  const socketIo = new SocketIoServer(server);

  // add game endpoints
  await initGameServer({ socketIo, store });

  return socketIo;
}
