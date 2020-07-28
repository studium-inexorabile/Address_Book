import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import storeCreator from './store/configureStore'
import { Provider } from 'react-redux'
// sets styles to be used in application
import 'normalize.css/normalize.css'
import './styles/styles.scss'

// uses function in 'configureStore.js' to create store
const store = storeCreator()
store.subscribe(() => {
    // logs state after any changes occur
    const state = store.getState()
    console.log(state)
})

const jsx = (
    // uses Provider to pass store info to all
    // rendered components
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.querySelector('#app'))
