export const register = username => state => (dispatch, getState, { socket }) => {
  socket.emit('register', { username });
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

export const playSound = which => state => (dispatch, getState, { playSound }) => {
  playSound(`sounds/${which}.mp3`);
};
