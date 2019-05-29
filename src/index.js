import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { GameStore } from './stores/GameStore'
import { GeneralStore } from './stores/GeneralStore'

const gameStore = new GameStore()
const generalStore = new GeneralStore()
const stores = {generalStore, gameStore}
gameStore.assignPlayer()
gameStore.getInitialGame()

ReactDOM.render(
<Provider {...stores}>
    <App />
</Provider>, document.getElementById('root'))

serviceWorker.unregister()