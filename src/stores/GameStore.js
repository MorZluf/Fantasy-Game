import { observable, action } from 'mobx'
import openSocket from 'socket.io-client'
import { GeneralStore } from './GeneralStore';

export class GameStore {
    @observable loading = true
    @observable socket = openSocket('http://localhost:8000')
    @observable gameState = {test: ""}
    @observable player = {}
    @observable currentPlayer = {}
    @observable game = {}

    @action getInitialGame = () => {
        this.socket.on('new-game-board', newGame => {
            this.game = newGame
            this.loading = false
        })
    }

    @action getGameState = () => {
        this.socket.on('update-game-to-client', newBoardState => {
            this.gameState = newBoardState
        })
    }

    @action sendGameState = () => this.socket.emit('update-game-to-server', this.gameState)

    @action assignPlayer = () => {
        this.socket.on('player-data', player => {
            this.player = player
        })
    }

    @action movePlayer = amount => {
        this.gameState.test = `Move ${this.currentPlayer.name} by ${amount}`
        this.sendGameState()
    }

    @action endTurn = () => {
        this.socket.emit('end-turn')
    }

    @action getCurrentTurn = () => {
        this.socket.on('new-turn', newPlayer => {
            this.currentPlayer = newPlayer
        })
    }
}