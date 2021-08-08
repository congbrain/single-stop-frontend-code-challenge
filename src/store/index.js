import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const configureStore = initialState => {
  const middlewares = [thunk]
  const composeEnhancers = composeWithDevTools || compose

  middlewares.push(require('redux-logger').createLogger({ collapsed: true }))

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  return store
}

export default configureStore
