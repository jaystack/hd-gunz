
export default async function initGameServer ({ socketIo }) {
  socketIo.on('connection', socket => {
    console.log('connected', socket.handshake)
    socket.on('disconnect', () => console.log('disconnected'))
    socket.on('private message', (from, msg) => {

    })
  })
}
