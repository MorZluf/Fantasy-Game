class PlayerHandler {
    constructor(){
        this.players = []
        this.playerCounter = 1
        this.currentTurn = 1
    }

    addPlayer(socket) {
        const player = {
            name: "Player " + this.playerCounter,
            id: socket.id
        }
        this.players.push(player)
        this.playerCounter ++
        return player
    }

    getPlayerTurn() {
        let rem = this.players.length % this.currentTurn
        let index = rem ? rem - 1 : this.players.length - 1
        console.log("Turn: " + this.currentTurn)
        console.log("index:" + index)
        return this.players[index]
    }

    advanceTurn() {
        this.currentTurn ++
        return this.getPlayerTurn()
    }
}

module.exports = PlayerHandler