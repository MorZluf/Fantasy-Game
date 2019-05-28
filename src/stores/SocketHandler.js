
class SocketHandler {
    constructor() {
        this.socket = openSocket('http://localhost:8000')
    }

    getGameState = async () => {
        let gameState = await this.socket.on('update-game-to-client', function(newBoardState) {
            return newBoardState
        })
        return gameState
    }
}