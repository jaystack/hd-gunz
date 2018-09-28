import { Store, thunk } from 'repatch'
import { generate as generateId } from 'shortid'

const GameStateFactory = () => ({
  gameId: generateId(),
  players: []
})

export const GameStoreFactory = () =>
  new Store(GameStateFactory())
    .addMiddleware(thunk)
    .addMiddleware(GameStateLogger)

const GameStateLogger = store => next => reducer => {
  const state = store.getState()
  const nextState = reducer(state)
  console.log(state, nextState)
  return next(_ => nextState)
}

