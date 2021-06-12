import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import redusers from './reducers'

export const store = createStore(
    redusers,
    {},
    applyMiddleware(thunk)
)