export default async function initGameServer({ socketIo }) {
  socketIo.on('connection', socket => {
    console.log('connected', socket.handshake);
    socket.emit('change', { a: 1 });
    console.log('-------------------')
    socket.on('disconnect', () => console.log('disconnected'));
    socket.on('private message', (from, msg) => {});
  });
}
