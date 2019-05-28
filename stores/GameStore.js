import { observable, action } from 'mobx'
import openSocket from 'socket.io-client'

export class StoreName {
    @observable socket = openSocket('http://localhost:8000')
    @observable gameState = {}

    @action getGameState = () => {
         this.socket.on('update-game-to-client', function(newBoardState) {
            this.gameState = newBoardState
        })
    }

    @action sendGameState = () => this.socket.emit('update-game-to-server', this.gameState)
}