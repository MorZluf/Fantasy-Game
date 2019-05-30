import { observable, action } from 'mobx'
import openSocket from 'socket.io-client'

export class GameStore {
    @observable loading = true
    @observable socket = openSocket('http://localhost:8000')
    @observable player = {} // identifier of a client { name : PlayerName , socketId : someID }
    @observable currentPlayer = {name: "Player_1"}
    @observable game = {}
    @observable isCurrentPlayer = true
    @observable curTileType = ""
    @observable movementRollMade = false
    @observable movementMade = false

    
    @action getTilePlayerSatandsOn = (x,y) => {
        return this.game.matrix[y][x]
    }

    getCoordByPlayerName = name => {
        for ( let i = 0 ; i < this.game.matrix.length ; i ++ )
            for ( let j = 0 ; j < this.game.matrix[i].length ; j ++ )
                if (  this.isExist(name, this.game.matrix[i][j].players) )
                    return { x : i , y : j }
    }

    isExist(name, names){ 
        return names.includes(name)
    }

    getTile(coords) {
        let x = coords.x
        let y = coords.y
        return this.game.matrix[y][x]
    }
    
    @action getTileType = () => {
        let coords = this.getCoordByPlayerName(this.currentPlayer.name)
        return this.getTile(coords).type
    }

    @action getInitialGame = () => {
        this.socket.on('new-game-board', newGame => {
            this.game = newGame
            this.loading = false
        })
    }
    @action fight = (chosenPlayer, currentPlayer) => {
        this.socket.emit('player-vs-player', {chosenPlayer, currentPlayer} )
    }
    @action getGameState = () => {
        this.socket.on('update-game-to-client', newGameState => {
            this.game = newGameState
        })
    }

    // @action sendGameState = () => this.socket.emit('update-game-to-server', this.game)

    @action assignPlayer = () => {
        this.socket.on('player-data', player => {
            this.player = player
            this.setCurrentPlayerStatus()
        })
    }

    @action movePlayer = key => {
        if (this.player.name !== this.currentPlayer.name) { return }
        else if (!this.movementRollMade) { return }
        else if (!this.getTile(this.getTileCoords(key)).canMoveHere) { return }
        else {
            this.socket.emit('move-player', {player: this.currentPlayer.name, coords: this.getTileCoords(key)})
            this.movementMade = true
        }
    }

    @action endTurn = () => {
        if (this.player.name !== this.currentPlayer.name) { return }
        else if (!this.movementMade) { return }
        else {
            this.socket.emit('end-turn')
            this.isCurrentPlayer = false
            this.movementRollMade = false
            this.movementMade = false
        }
    }

    @action getCurrentTurn = () => {
        this.socket.on('new-turn', newPlayer => {
            this.currentPlayer = newPlayer
            this.setCurrentPlayerStatus()
        })
    }

    @action rollDie = () => {
        if (this.player.name !== this.currentPlayer.name) { return }
        else {
            this.socket.emit('roll-movement', this.currentPlayer)
            this.movementRollMade = true
        }
    }

    @action getPlayerData = player => {
        return this.game.players[player]
    }

    getTileCoords = key => {return { x: key.slice(2), y: key.slice(0, 1) }}

    setCurrentPlayerStatus = () => {
        if (this.player.name !== this.currentPlayer.name) { this.isCurrentPlayer = false }
        else {
            this.isCurrentPlayer = true
            this.movementRollMade = false
            this.movementMade = false
        }
    }
}