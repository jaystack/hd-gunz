import * as repatch from 'repatch';
import { STATUS_WAITING } from './game-server.mjs';

const store = new repatch.default.Store({
  players: [],
  status: STATUS_WAITING
});

export default store;
