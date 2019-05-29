import { observable, action } from 'mobx'
import openSocket from 'socket.io-client'
import { GeneralStore } from './GeneralStore';

export class GameStore {
    @observable loading = true
    @observable socket = openSocket('http://localhost:8000')
    // @observable gameState = {test: ""}
    @observable player = {}
    @observable currentPlayer = {}
    @observable game = {}
    @observable isBattle = false

    @action getInitialGame = () => {
        this.socket.on('new-game-board', newGame => {
            this.game = newGame
            this.currentPlayer = {name: "Player_1"}
            this.loading = false
        })
    }

    @action getGameState = () => {
        this.socket.on('update-game-to-client', newGameState => {
            this.game = newGameState
        })
    }

    // @action sendGameState = () => this.socket.emit('update-game-to-server', this.game)

    @action assignPlayer = () => {
        this.socket.on('player-data', player => {
            this.player = player
        })
    }

    @action movePlayer = key => {
        this.socket.emit('move-player', {player: this.currentPlayer.name, coords: this.getTileCoords(key)})
    }

    @action endTurn = () => {
        this.socket.emit('end-turn')
    }

    @action getCurrentTurn = () => {
        this.socket.on('new-turn', newPlayer => {
            this.currentPlayer = newPlayer
        })
    }

    getTileCoords = key => {return { x: key.slice(2), y: key.slice(0, 1) }}
}