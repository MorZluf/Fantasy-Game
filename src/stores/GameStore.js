import { observable, action } from 'mobx'
import openSocket from 'socket.io-client'

export class GameStore {
    @observable socket = openSocket('http://localhost:8000')
    @observable gameState = {test: ""}
    @observable player = {name: ""}
    @observable currentPlayer = "Player 1"

    @action getGameState = () => {
        this.socket.on('update-game-to-client', newBoardState => {
            this.gameState = newBoardState
        })
    }

    @action sendGameState = () => this.socket.emit('update-game-to-server', this.gameState)

    @action assignPlayer = () => {
        this.socket.on('player-data', player => {
            this.player.name = player.name
            console.log(this.player)
        })
    }

    @action movePlayer = amount => {
        this.gameState.test = `Move ${this.player.name} by ${amount}`
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