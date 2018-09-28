export default async function initGameServer({ socketIo, store }) {
  socketIo.on('connection', socket => {
    console.log('connected', socket.handshake);
    socket.emit('change', store.getState());
    console.log('-------------------');
    socket.on('disconnect', () => console.log('disconnected'));
    socket.on('private message', (from, msg) => {});
  });
}
