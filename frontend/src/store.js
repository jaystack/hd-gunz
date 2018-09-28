import Store, { thunk } from 'repatch';

export default new Store({
  me: '',
  gameState: null
}).addMiddleware(thunk.withExtraArgument({}));
