class PlayerHandler {
    constructor(){
        this.players = []
        this.playerCounter = 1
        currentTurn = 1
    }

    getStartingPlayer() {
        return this.players[0]
    }

    addPlayer(socket) {
        const player = "Player " + playerCounter
        this.players.push(player)
        this.playerCounter ++
        return player
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