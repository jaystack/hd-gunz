import * as repatch from 'repatch';

const store = new repatch.default.Store({
  players: [],
  status: 'waiting'
});

export default store;
