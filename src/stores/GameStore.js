import { observable, action } from 'mobx'
import openSocket from 'socket.io-client'

export class GameStore {
    @observable loading = true
    @observable socket = openSocket('http://localhost:8000')
    @observable player = {} // identifier of a client { name : PlayerName , socketId : someID }
    @observable currentPlayer = { name: "Player_1" }
    @observable game = {}
    @observable isCurrentPlayer = true
    @observable curTileType = ""
    @observable movementRollMade = false
    @observable fightStats = {}  // = { player1: name1, player2: name2, rolledDie1 : -1, rolledDie2 : -1 , isStarted: false}
    @observable popupType = "start_battle"
    @action getTilePlayerSatandsOn = (x, y) => {
        return this.game.matrix[y][x]
    }

    getPlayerStatsByPlayer = name => {
        // hard coded! 
        return {
            strength : 5,
            craft : 3,
            gold : 2,
            life : 7
        }
    }
    
    getCoordByPlayerName = name => {
        for (let i = 0; i < this.game.matrix.length; i++)
            for (let j = 0; j < this.game.matrix[i].length; j++)
                if (this.isExist(name, this.game.matrix[i][j].players))
                    return { x: i, y: j }
    }

    isExist(name, names) {
        return names.includes(name)
    }

    getTileType = () => {
        let coords = this.getCoordByPlayerName(this.currentPlayer.name)
        let x = coords.x
        let y = coords.y
        return this.game.matrix[y][x].type
    }

    @action isToShowFightScreen = () => {
        this.socket.on('show-fight-screen', () => {
            this.isToShowFightScreen = true
        })
    }
    @action getInitialGame = () => {
        this.socket.on('new-game-board', newGame => {
            this.game = newGame
            this.loading = false
        })
    }

    @action fight = (chosenPlayer, currentPlayer) => {
        this.socket.emit('player-vs-player', { chosenPlayer, currentPlayer })
    }

    @action getGameState = () => {
        this.socket.on('update-game-to-client', newGameState => {
            this.game = newGameState
        })
    }

    @action initializeFightStats = () => {
        this.socket.on('initialize-player-vs-player-fightstats', fightStats => {
            this.fightStats = fightStats
        })
    }
    // @action sendGameState = () => this.socket.emit('update-game-to-server', this.game)
    @action changeToStarted = (chosenPlayer, currentPlayer) => {
        this.socket.emit('change-game-started-to-started', { chosenPlayer, currentPlayer })
    }

    @action renderFightScreen = () => {
        this.socket.emit('enable-show-fight-screen')
    }
    @action assignPlayer = () => {
        this.socket.on('player-data', player => {
            this.player = player
            this.setCurrentPlayerStatus()
        })
    }

    @action renderPopup = argPopupType => {
        this.popupType = argPopupType
    }

    @action movePlayer = key => {
        if (this.player.name !== this.currentPlayer.name) { return }
        this.socket.emit('move-player', { player: this.currentPlayer.name, coords: this.getTileCoords(key) })
    }

    @action endTurn = () => {
        if (this.player.name !== this.currentPlayer.name) { return }
        this.socket.emit('end-turn')
    }

    @action getCurrentTurn = () => {
        this.socket.on('new-turn', newPlayer => {
            this.currentPlayer = newPlayer
            this.setCurrentPlayerStatus()
        })
    }

    @action rollDie = () => {
        if (this.player.name !== this.currentPlayer.name) { return }
        this.socket.emit('roll-movement', this.currentPlayer)
        this.movementRollMade = true
    }

    getTileCoords = key => { return { x: key.slice(2), y: key.slice(0, 1) } }

    setCurrentPlayerStatus = () => {
        if (this.player.name !== this.currentPlayer.name) { this.isCurrentPlayer = false }
        else {
            this.isCurrentPlayer = true
            this.movementRollMade = false
        }
    }
}