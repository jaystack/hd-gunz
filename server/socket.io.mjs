import SocketIoServer from 'socket.io';
import initGameServer from './game/game-server.mjs';

export default async function initSocketIoApp({ server }) {
  const socketIo = new SocketIoServer(server);

  // add game endpoints
  await initGameServer({ socketIo });

  return socketIo;
}
