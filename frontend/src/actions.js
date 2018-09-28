export const register = username => state => (dispatch, getState, { socket }) => {
  socket.emit('register', { username });
  dispatch(state => ({ ...state, me: username }));
};

export const ready = () => state => (dispatch, getState, { socket }) => {
  socket.emit('ready');
};
