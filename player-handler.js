class PlayerHandler {
    constructor(){
        this.players = []
        this.playerCounter = 1
        currentTurn = 1
    }

    addPlayer(socket) {
        const player = {
            name: "player" + playerCounter,
            id: socket.id
        }
        this.players.push(player)
        this.playerCounter ++
    }

    getPlayerTurn() {
        let rem = this.players.length % currentTurn
        let index = rem ? rem - 1 : this.players.length - 1
        return this.players[index]
    }

    advanceTurn() {
        this.currentTurn ++
        return this.getPlayerTurn()
    }
}

module.exports = PlayerHandler