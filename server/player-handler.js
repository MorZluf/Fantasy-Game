class PlayerHandler {
    constructor(){
        this.rooms = {}
    }

    addPlayer(socket, room) {
        this.rooms[room] ? 
            this.rooms[room].players.push({
                name: "Player_" + this.rooms[room].playerCounter,
                id: socket.id
            }) :
            this.rooms[room] = {
                players: [{
                    name: "Player_1",
                    id: socket.id
                }],
                playerCounter: 1,
                currentTurn: 1
            }
        this.rooms[room].playerCounter ++
        console.log(this.rooms[room].players[this.rooms[room].playerCounter - 2])
        return this.rooms[room].players[this.rooms[room].playerCounter - 2]
    }

    getPlayerTurn(room) {
        let rem = this.rooms[room].currentTurn % this.rooms[room].players.length
        let index = rem ? rem - 1 : this.rooms[room].players.length - 1
        return this.rooms[room].players[index]
    }

    advanceTurn(room) {
        this.rooms[room].currentTurn ++
        return this.getPlayerTurn(room)
    }

    removePlayer(socket, room) {
        let index = this.rooms[room].players.indexOf(p => p.id === socket.id)
        this.rooms[room].players.splice(index, 1)
        this.rooms[room].playerCounter --
    }
}

module.exports = PlayerHandler