import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { GameStore } from './stores/GameStore'
import { GeneralStore } from './stores/GeneralStore'
import { DataStore } from './stores/DataStore';

const gameStore = new GameStore()
const generalStore = new GeneralStore()
const dataStore = new DataStore()
const stores = {generalStore, gameStore, dataStore}
gameStore.assignPlayer()
gameStore.getInitialGame()

ReactDOM.render(
<Provider {...stores}>
    <App />
</Provider>, document.getElementById('root'))

serviceWorker.unregister()