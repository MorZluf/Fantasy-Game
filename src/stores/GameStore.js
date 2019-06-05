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
    @observable fightStore
    @observable clientState = {
        isCurrentPlayer: true,
        currentTile: {},
        movementRollMade: false,
        movementMade: false,
        cardDrawn: false,
        purchaseAlerts: []
    }
    @observable isShowVillagePopup = false

    @observable isShowClassSelectPopup = false
    // @observable drawnCard = {}



    @action initFightPlayers = (player, opponent) => {
        this.fightStore.player = player
        this.fightStore.opponent = opponent
        this.socket.emit('initialize-player-vs-player-fightstats', this.fightStore)
    }

    @action initPlayerEnemyFight = (player, enemyCard) => {
        this.fightStore.player = player
        this.fightStore.opponent = enemyCard.title
        this.fightStore.opponentType = "enemy"
        this.socket.emit('initialize-player-vs-enemy-fight', this.fightStore)
    }

    @action initPlayerGuardianFight = () => {
        this.fightStore.player = this.currentPlayer.name
        this.fightStore.opponent = "De Guardian"
        this.fightStore.opponentType = "guardian"
        this.socket.emit('initialize-player-vs-guardian-fight', this.fightStore)
    }

    @observable isShowClassSelectPopup = false


    @action isPlayerCurrent = () => this.player.name === this.currentPlayer.name

    @action getTilePlayerSatandsOn = (x, y) => {
        return this.game.matrix[y][x]
    }

    @action submitPlayer = () => {
        this.game.fightStore.playerSubmit = true
    }

    bothPlayersSubmittedDie = () => this.fightStats.player1_submit && this.fightStats.player2_submit ? true : false

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

    @action getClassDetails = className => {
        let selectedClass = this.game.arrClasses.findIndex(cl => cl.name == className)
        return this.game.arrClasses[selectedClass]
    }

    @action setPlayerClass = (playerName, className) => {
        let playerObject = {
            playerName,
            clientName: this.player.name,
            className
        }
        this.socket.emit('class-select', playerObject)
    }

    @action fight = (chosenPlayer, currentPlayer) => {
        this.socket.emit('player-vs-player', { chosenPlayer, currentPlayer })
    }

    @action getGameState = () => {
        this.socket.on('update-game-to-client', newGameState => {
            this.game = newGameState
            if (this.game.isEndGame)
                this.game.popupType = "end-game"
            this.clientState.cardDrawn = false
        })
    }

    @action getUpdatesFightStore = () => {
        this.socket.on('calculate-win-lose', fightStore => {
            this.fightStore = fightStore
        })
    }

    @action calculatedBoth = () => {
        this.socket.on('calculated-both', fightStore => {
            this.fightStore = fightStore
        })
    }

    @action getTranslateLifeFromPlayerToPlayer = () => {
        this.socket.emit('transfer-life-from-player-to-player', this.fightStore)
    }
    @action calculateWinnerLosePlayerVsEnemy = () => {
        this.socket.emit('calculate-winner-loser-player-vs-enemy', this.fightStore)
    }

    @action resetFightStats = () => {
        this.socket.emit('reset-fight-store')
    }


    @action resetFightStore = () => {
        this.socket.on('reset-fight-store-broadcast', () => {
            if (this.game.isEndGame) 
                this.game.popupType = "end-game"
            else {
                this.fightStore = {}
                this.game.popupType = ""
            }
        })
    }

    @action getFightState = () => {
        this.socket.on('show-fight-screen-selected', fightStore => {
            this.fightStore = fightStore
            this.getPlayerAndOpponentStats()
            this.game.popupType = "start_battle"
        })
    }

    @action getFightPlayerEnemyState = () => {
        this.socket.on('show-player-vs-enemy', fightStore => {
            this.fightStore = fightStore
            this.getPlayerAndEnemyStats()
            this.game.popupType = "fight_enemy"
        })
    }

    @action getFightPlayerGuardianState = () => {
        this.socket.on('show-player-vs-guardian', fightStore => {
            this.fightStore = fightStore
            this.getPlayerAndGuardianStats()
            this.game.popupType = "fight_guardian"
        })
    }

    getPlayerAndOpponentStats = () => {
        let player = this.fightStore.player
        let opponent = this.fightStore.opponent

        this.fightStore.playerStats = this.getPlayerByName(player).stats
        this.fightStore.opponentStats = this.getPlayerByName(opponent).stats
    }

    getPlayerAndEnemyStats = () => {
        let player = this.fightStore.player

        this.fightStore.playerStats = this.getPlayerByName(player).stats
        this.fightStore.opponentStats = this.drawnCard.stats
    }
    getPlayerAndGuardianStats = () => {
        let player = this.fightStore.player

        this.fightStore.playerStats = this.getPlayerByName(player).stats
        this.fightStore.opponentStats = { strength: 13 }
    }

    getPlayerByName = name => {
        let result = this.game.players[name]
        return result
    }

    @action assignRolledNumberToPlayerAndEnemy = (playerRandom, enemyRandom) => {
        this.fightStore.playerRoll = playerRandom
        this.changePlayerSubmittedState(true)
        this.fightStore.opponentRoll = enemyRandom
        this.fightStore.opponentSubmit = true

        this.socket.emit('update-fightStore-state', this.fightStore)
    }

    @action assignRolledNumberToPlayer = num => {
        this.fightStore.playerRoll = num
        this.changePlayerSubmittedState(true)
        this.socket.emit('update-fightStore-state', this.fightStore)
    }

    @action assignRolledNumberToOpponent = num => {
        this.fightStore.opponentRoll = num
        this.changeOpponentSubmittedState(true)
        this.socket.emit('update-fightStore-state', this.fightStore)
    }

    changePlayerSubmittedState = bool => {
        this.fightStore.playerSubmit = bool
    }

    changeOpponentSubmittedState = bool => {
        this.fightStore.opponentSubmit = bool
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
    addDefeatedEnemyToPlayer = () => {
        let player = this.fightStore.player
        let opponent = this.fightStore.opponent

        this.game.players[player].collectedEnemies.push(opponent)
    }
    @action movePlayer = key => {
        const tile = this.getTile(this.getTileCoords(key))
        this.clientState.currentTile = tile
        if (this.player.name !== this.currentPlayer.name) { return }
        else if (!this.clientState.movementRollMade) { return }
        else if (!tile.canMoveHere) { return }
        else {
            this.socket.emit('move-player', { player: this.currentPlayer.name, coords: this.getTileCoords(key) })
            this.clientState.movementMade = true
            this.determineTileActions(tile, false)
        }
    }

    @action determineTileActions = (tile, noCombat) => {
        if (tile.players.length > 0 && !noCombat) { this.game.popupType = "combat_popup" }
        else if (tile.type === "Village") { this.game.popupType = "village_options" }
        else if (tile.type === "Fields") { this.game.popupType = "field_options" }
        else if (tile.type === "Woods") { this.game.popupType = "woods_options" }
        else if (tile.type === "Hills") { this.game.popupType = "hills_options" }
        else if (tile.type === "Guardian") { this.game.popupType = "guardian_options" }
        else { this.game.popupType = "" }
        this.socket.emit('change-popup-type', this.game.popupType)
    }

    @action drawAdventureCard = () => this.socket.emit('draw-adventure-card')

    @action setDrawnAdventureCard = () => {
        this.socket.on('adventure-card-drawn', drawnCard => {
            this.drawnCard = drawnCard
            this.clientState.cardDrawn = true
        })
    }

    @action addCardToPlayer = (player, card) => {
        // this.game.players[player][card.type === "item" ? "inventory" : "followers"].push(card)
        let cardAddObject = {
            player: player,
            card: card,
            action: "add"
        }
        this.socket.emit('add-remove-card', cardAddObject)
    }

    @action subtractGold = (player, num) => {
        let itemObject = {
            player,
            num
        }
        this.socket.emit('item-purchase', itemObject)
    }

    @action alertCardGain = () => {
        this.socket.on('alert-gained-card', card => {
            this.clientState.purchaseAlerts.push(card)
        })
    }

    @action closePopup = () => this.socket.emit('close-popup-to-server')

    @action endTurn = () => {
        this.socket.emit('end-turn')
        this.clientState.isCurrentPlayer = false
        this.clientState.movementRollMade = false
        this.clientState.movementMade = false
    }

    @action getCurrentTurn = () => {
        this.socket.on('new-turn', newPlayer => {
            this.game.popupType = ""
            this.clientState.currentTile = {}
            this.currentPlayer = newPlayer
            this.setCurrentPlayerStatus()
        })
    }

    @action rollDie = () => {
        if (this.player.name !== this.currentPlayer.name) { return }
        else {
            this.socket.emit('roll-movement', this.currentPlayer)
            this.clientState.movementRollMade = true
        }
    }

    getTileCoords = key => { return { x: key.slice(2), y: key.slice(0, 1) } }

    @action getPlayerData = player => {
        return this.game.players[player]
    }

    setCurrentPlayerStatus = () => {
        if (this.player.name !== this.currentPlayer.name) { this.clientState.isCurrentPlayer = false }
        else {
            this.clientState.isCurrentPlayer = true
            this.clientState.movementRollMade = false
            this.clientState.movementMade = false
        }
    }
}