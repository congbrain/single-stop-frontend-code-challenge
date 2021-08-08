import React from 'react'
import { Provider } from 'react-redux'
import Comments from './pages/Comments'
import configureStore from './store'

const store = configureStore({})

function App () {
  return (
    <Provider store={store}>
      <Comments />
    </Provider>
  )
}

export default App
