export const register = username => state => (dispatch, getState, { socket }) => {
  socket.emit('register', { username });
  dispatch(ready());
  dispatch(state => ({ ...state, me: username }));
};

export const ready = () => state => (dispatch, getState, { socket }) => {
  socket.emit('ready');
};

export const bet = amount => state => (dispatch, getState, { socket }) => {
  socket.emit('bet', { amount });
};

export const betSubmit = () => state => (dispatch, getState, { socket }) => {
  socket.emit('betSubmit');
};

export const shoot = () => state => (dispatch, getState, { socket }) => {
  socket.emit('shoot');
};
