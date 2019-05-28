class PlayerHandler {
    constructor(){
        this.players = []
        this.playerCounter = 1
        this.currentTurn = 1
    }

    addPlayer() {
        const player = "Player " + this.playerCounter
        this.players.push(player)
        this.playerCounter ++
        return player
    }

    getPlayerTurn() {
        let rem = this.players.length % this.currentTurn
        let index = rem ? rem - 1 : this.players.length - 1
        return this.players[index]
    }

    advanceTurn() {
        this.currentTurn ++
        return this.getPlayerTurn()
    }
}

module.exports = PlayerHandler