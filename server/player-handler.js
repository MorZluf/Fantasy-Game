class PlayerHandler {
    constructor(){
        this.players = []
        this.playerCounter = 1
        this.currentTurn = 1
    }

    addPlayer(socket) {
        const player = {
            name: "Player_" + this.playerCounter,
            id: socket.id
        }
        this.players.push(player)
        this.playerCounter ++
        return player
    }

    getPlayerTurn() {
        let rem = this.currentTurn % this.players.length
        let index = rem ? rem - 1 : this.players.length - 1
        return this.players[index]
    }

    advanceTurn() {
        this.currentTurn ++
        return this.getPlayerTurn()
    }

    removePlayer(socket) {
        let index = this.players.indexOf(p => p.id === socket.id)
        this.players.splice(index, 1)
        this.playerCounter --
    }
}

module.exports = PlayerHandler