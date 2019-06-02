import { observable, action } from 'mobx'
import openSocket from 'socket.io-client'

export class GameStore {
    constructor(fightStore) {
        this.fightStore = fightStore
    }

    @observable loading = true
    @observable socket = openSocket('http://localhost:8000')
    @observable player = {} // identifier of a client { name : PlayerName , socketId : someID }
    @observable currentPlayer = { name: "Player_1" }
    @observable game = {}
    @observable isCurrentPlayer = true
    @observable curTileType = ""
    @observable movementRollMade = false
    @observable movementMade = false
    @observable cardDrawn = true
    @observable fightStore
    @observable fightStats = { // = { player1: name1, player2: name2, rolledDie1 : -1, rolledDie2 : -1 , isStarted: false}
        player1: "",
        player2: "",
        rolledDie1: -1,
        rolledDie2: -1,
        player1_stats: {
            strength : 0,
        },
        player2_stats: {
            strength : 0,
        },
        player1_submit: false,
        player2_submit: false
    }

    @action initFightPlayers = (player, opponent) => {
        this.fightStore.player = player
        this.fightStore.opponent = opponent
        
        this.socket.emit('initialize-player-vs-player-fightstats', this.fightStore)
    }

    @action getTilePlayerSatandsOn = (x, y) => {
        return this.game.matrix[y][x]
    }
    @action assingToPlayer1 = (num, player1) => {
        this.fightStats.player1 = player1
        this.fightStats.rolledDie1 = num
    }
    @action assingToPlayer2 = (num, player2) => {
        this.fightStats.player2 = player2
        this.fightStats.rolledDie2 = num
    }

    @action submitPlayer = player => {
        player === this.fightStats.player1
            ?
            this.fightStats.player1_submit = true
            :
            this.fightStats.player2_submit = true

        if (this.bothPlayersSubmittedDie())
            this.game.popupType = "show_win_lose"
    }

    bothPlayersSubmittedDie = () => this.fightStats.player1_submit && this.fightStats.player2_submit ? true : false


    getPlayerStatsByPlayer = name => {
        // hard coded! 
        return {
            strength: 5,
            craft: 3,
            gold: 2,
            life: 7
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

    getTile(coords) {
        let x = coords.x
        let y = coords.y
        return this.game.matrix[y][x]
    }

    @action getTileType = () => {
        let coords = this.getCoordByPlayerName(this.currentPlayer.name)
        return this.getTile(coords).type
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

    // vova ToDo : Check if can be removed..
    // @action initializeFightStats = () => {
    //     this.socket.on('initialize-player-vs-player-fightstats', fightStats => {
    //         this.fightStats = fightStats
    //     })
    // }

    @action showFightScreen = () => {
        this.socket.on('show-fight-screen-selected', fightStore => {
            this.fightStore = fightStore
        })
    }
    @action changeToStarted = (chosenPlayer, currentPlayer) => {
        this.socket.emit('change-game-started-to-started', { chosenPlayer, currentPlayer })
    }

    // old
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
        this.game.popupType = argPopupType
    }

    @action movePlayer = key => {
        const tile = this.getTile(this.getTileCoords(key))
        if (this.player.name !== this.currentPlayer.name) { return }
        else if (!this.movementRollMade) { return }
        else if (!tile.canMoveHere) { return }
        else {
            this.socket.emit('move-player', { player: this.currentPlayer.name, coords: this.getTileCoords(key) })
            this.movementMade = true
            this.determineTileActions(tile)
        }
    }

    determineTileActions = tile => {
        if (tile.players.length > 0) { this.game.popupType = "combat_popup" }
        else if (tile.type === "Village") { this.game.popupType = "village_options" }
        else if (tile.type === "Fields") { 
            this.game.popupType = "field_options"
            this.cardDrawn = false
            this.drawAdventureCard()
        }
        else { this.game.popupType = "" }
        this.socket.emit('change-popup-type', this.game.popupType)
    }

    drawAdventureCard = () => {
        this.cardDrawn = true
    }

    @action endTurn = () => {
        if (this.player.name !== this.currentPlayer.name) { return }
        else if (!this.movementMade) { return }
        else if (!this.cardDrawn) { return }
        else {
            this.socket.emit('end-turn')
            this.isCurrentPlayer = false
            this.movementRollMade = false
            this.movementMade = false
        }
    }

    @action getCurrentTurn = () => {
        this.socket.on('new-turn', newPlayer => {
            this.game.popupType = ""
            this.currentPlayer = newPlayer
            this.setCurrentPlayerStatus()
        })
    }

    @action rollDie = () => {
        if (this.player.name !== this.currentPlayer.name) { return }
        else {
            console.log(this.fightStore.dummyCheck)
            this.socket.emit('roll-movement', this.currentPlayer)
            this.movementRollMade = true
        }
    }

    getTileCoords = key => { return { x: key.slice(2), y: key.slice(0, 1) } }

    @action getPlayerData = player => {
        return this.game.players[player]
    }

    setCurrentPlayerStatus = () => {
        if (this.player.name !== this.currentPlayer.name) { this.isCurrentPlayer = false }
        else {
            this.isCurrentPlayer = true
            this.movementRollMade = false
            this.movementMade = false
        }
    }
}