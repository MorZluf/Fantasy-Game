import { observable, action } from 'mobx'
import openSocket from 'socket.io-client'

export class GameStore {
    @observable socket = openSocket('http://localhost:8000')
    @observable gameState = {test: ""}
    @observable player = {}
    @observable currentPlayer = "Player 1"

    @action getGameState = () => {
        this.socket.on('update-game-to-client', function(newBoardState) {
            this.gameState = newBoardState
        })
    }

    @action sendGameState = () => this.socket.emit('update-game-to-server', this.gameState)

    @action assignPlayer = () => {
        this.socket.on('player-data', function(player) {
            this.player = player
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
        this.socket.on('new-turn', function(newPlayer) {
            this.currentPlayer = newPlayer
        })
    }
}