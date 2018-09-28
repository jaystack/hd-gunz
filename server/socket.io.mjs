import SocketIoServer from 'socket.io'
import initGameServer from './game/game-server.mjs'

export default async function initSocketIoApp ({
  server,
  path = '/test'
}) {
  const socketIo = new SocketIoServer(server, {
    path,
    serveClient: false
  })

  // add game endpoints
  await initGameServer({ socketIo })

  return socketIo
}
