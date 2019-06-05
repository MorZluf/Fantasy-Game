const Matrix = require('./matrix')
const Class = require('../server/models/Class')
const DataDao = require('./utils/dataDao')
const dataDao = new DataDao()
class Game extends Matrix {
    constructor(numRows, numColumns) {
        super(numRows, numColumns)
        this.players = {
            "Player_1":
            {
                name: "charname",
                class: "Warrior",
                stats: {
                    strength: 4,
                    craft: 2,
                    life: 5,
                    gold: 1,
                },
                inventory: [],
                followers: [],
                collectedEnemies: []
            },
            "Player_2":
            {
                name: "charname",
                class: "Warrior",
                stats: {
                    strength: 4,
                    craft: 2,
                    life: 5,
                    gold: 1,
                },
                inventory: [],
                followers: [],
                collectedEnemies: []
            }
        }
        this.outerRegionAsArray = []
        this.adventureCards = []
        this.movementDie = 4
        this.isBattleOn = false
        this.arrPlayersOnTile = []
        this.popupType = ""
        this.arrClasses = []
        this.isEndGame = false
        this.gameWinner = "dummy-player"
        this.populateAdventureCards()
        this.setInitialBoard()
        this.populateClassesArr()
        this.villageInventory = [
            { type: "item", title: "Sword", img: "https://cdn.shopify.com/s/files/1/2419/9027/products/p_720f2831-c891-4ae9-8aed-c81ebcad4565_1024x.png?v=1539401272", text: "Add 1 to your strength", stats: { strength: 1, craft: null, life: null, gold: null }, isStatic: true, isWeapon: true },
            { type: "item", title: "Axe", img: "https://vignette.wikia.nocookie.net/elderscrolls/images/4/41/NordicWaraxe.png/revision/latest?cb=20130309120028", text: "Add 1 to your strength", stats: { strength: 1, craft: null, life: null, gold: null }, isStatic: true, isWeapon: true },
            { type: "item", title: "Potion", img: "https://www.portailsmm.com/cs/rsc/thumb50809.png_2v_31020.png", text: "Add 1 to your life", stats: { strength: null, craft: null, life: 1, gold: null }, isStatic: true, isWeapon: false }
        ]
    }


    getPlayers() {
        return this.players
    }

    resetPopup() {
        this.popupType = ""
    }

    transferLifeFromPlayerToPlayer(winner, loser) {
        this.players[loser].stats.life = this.players[loser].stats.life - 1
        this.checkIfToEndGame(winner,loser)
    }
    
    calculateWinnerAndLoserPlayerVsEnemy(winner, loser){
        this.players[loser].stats.life = this.players[loser].stats.life - 1
        this.checkIfToEndGame(winner,loser)
    }

    checkIfToEndGame(winner,loser){
        if ( this.players[loser].stats.life == 0 )
            this.endGame(winner)
    }

    endGame() {
        this.assignGameWinner()
        this.isEndGame = true
    }

    // ---------------------------
    // works only cuz we have 2 players. if we have more than 2, wont work
    // ---------------------------
    assignGameWinner() {
        const players = Object.values(this.players)
        for ( let i = 0 ; i < players.length ; i++) 
            if ( players[i].stats.life !== 0 )
                this.gameWinner = players[i]   
    }
    setInitialBoard() {
        this.addPlayerToTile("Player_1", { x: 0, y: 2 }) 
        this.addPlayerToTile("Player_2", { x: 4, y: 2 }) 
        this.changeTileType("Village", { x: 0, y: 0 })
        this.changeTileType("Village", { x: 4, y: 0 })
        this.changeTileType("Village", { x: 0, y: 4 })
        this.changeTileType("Village", { x: 4, y: 4 })
        this.changeTileType("Woods", { x: 0, y: 3 })
        this.changeTileType("Woods", { x: 4, y: 3 })
        this.changeTileType("Woods", { x: 2, y: 0 })
        this.changeTileType("Guardian", { x: 3, y: 4 })
        this.changeTileType("Hills", { x: 1, y: 4 })
        this.changeTileType("Hills", { x: 4, y: 2 })
        this.changeTileType("Hills", { x: 0, y: 1 })

        this.fillCenter()
        this.closeAllTiles()
    }


    setPlayers(clientName, playerName, className) {
        let selectedClass = this.findSelectedClass(className)

        this.players[clientName] = {
            name: playerName,
            class: className,

            stats: {
                strength: selectedClass.stats.strength,
                craft: selectedClass.stats.craft,
                life: selectedClass.stats.life,
                gold: selectedClass.stats.gold,
            },
            inventory: [],
            followers: [],
            collectedEnemies: []
        }
    }

    findSelectedClass(className) {
        let selectedClass = this.arrClasses.findIndex(cl => cl.name == className)
        return this.arrClasses[selectedClass]
    }

    closeAllTiles() {
        for (let r = 0; r < this.matrix.length; r++) {
            for (let c = 0; c < this.matrix[r].length; c++) {
                this.matrix[r][c].canMoveHere = false
            }
        }
    }

    enableFightScreen() {
        this.isToShowFightScreen = true
    }

    fillCenter() {
        for (let r = 1; r < this.matrix.length - 1; r++) {
            for (let c = 1; c < this.matrix[r].length - 1; c++) {
                this.matrix[r][c].type = "Center"
                // this.matrix[r][c].canMoveHere = false
            }
        }
    }

    addPlayerToTile(player, position) {
        if (this.matrix[position.y][position.x].canMoveHere) {
            this.matrix[position.y][position.x].players.push(player)
            return true
        }
        else { return false }
    }

    removePlayerFromTile(player, position) {
        let index = this.matrix[position.y][position.x].players.findIndex(p => p === player)
        this.matrix[position.y][position.x].players.splice(index, 1)
    }

    // returns {winner: "playerOR_opponent", loser: "playerOR_opponent"}  
    calculateWinnerAndLoser(fightStore) {
        let result = {}
        let playerStrength = fightStore.playerRoll + fightStore.playerStats.strength
        let opponentStrength = fightStore.opponentRoll + fightStore.opponentStats.strength

        if (playerStrength > opponentStrength)
            result = {
                winner: fightStore.player,
                loser: fightStore.opponent,
                isTie: false
            }
        else if (playerStrength < opponentStrength)
            result = {
                winner: fightStore.opponent,
                loser: fightStore.player,
                isTie: false
            }
        else
            result = {
                winner: "",
                loser: "",
                isTie: true
            }

        return result
    }
    movePlayer(moveData) {  //moveData = {player: "NAME", coords: {x: "NUM", y: "NUM"}}

        let oldPosition = this.findPlayerCoordinates(moveData.player)
        let allowed = this.addPlayerToTile(moveData.player, moveData.coords)

        if (allowed) {
            this.removePlayerFromTile(moveData.player, oldPosition)
            this.closeAllTiles()
            if (this.checkIfTwoPlayersOnSameTile(moveData)) {
                this.changeShowPopupState(true)
                this.arrPlayersOnTile = this.getAllPlayersByATile(moveData.coords.x, moveData.coords.y)
            }
            else this.changeShowPopupState(false)
            return true
        }
        else { return false }
    }

    getAllPlayersByATile(x, y) { return this.matrix[y][x].players }

    changeShowPopupState(trueOrFalse) {
        this.isBattleOn = trueOrFalse
    }

    checkIfTwoPlayersOnSameTile(moveData) {
        return this.matrix[moveData.coords.y][moveData.coords.x].players.length > 1
    }

    changeTileOpenStatus(position) {
        this.matrix[position.y][position.x].canMoveHere = !this.matrix[position.y][position.x].canMoveHere
    }
    changeTileType(type, position) {
        this.matrix[position.y][position.x].type = type
    }

    rollDie(dieType) {
        let dieRoll = Math.floor(Math.random() * Math.floor(dieType) + 1)
        return dieRoll
    }

    getPossibleMovement(player) {
        let position = this.findPlayerCoordinates(player)

        let index
        this.movementDie = Number(this.rollDie(1)) // TODO: changed Math.floor(6) -->  Math.floor(6) for combat troubleshooting

        for (let pos in this.outerRegionAsArray) {
            if (this.outerRegionAsArray[pos].coords.x === position.x &&
                this.outerRegionAsArray[pos].coords.y === position.y) {
                index = Number(pos)
                break
            }
        }
        if (index < this.movementDie) {
            let rest = this.movementDie - index
            return {
                option1: this.outerRegionAsArray[parseInt(index + this.movementDie)],
                option2: this.outerRegionAsArray[this.outerRegionAsArray.length - rest],
                original: position
            }
        }
        else if (index + this.movementDie > (this.outerRegionAsArray.length - 1)) {
            let rest = this.movementDie - (this.outerRegionAsArray.length - index)
            return {
                option1: this.outerRegionAsArray[rest],
                option2: this.outerRegionAsArray[index - this.movementDie],
                original: position
            }
        }
        else {

            return {
                option1: this.outerRegionAsArray[index + this.movementDie],
                option2: this.outerRegionAsArray[index - this.movementDie],
                original: position
            }
        }
    }

    setPossibleMovement(player) {
        let options = this.getPossibleMovement(player.name)
        this.changeTileOpenStatus(options.option1.coords)
        this.changeTileOpenStatus(options.option2.coords)
        let currentTile = this.matrix[options.original.y][options.original.x]
        if (this.players[player.name].class === "Elf" && currentTile.type === "Woods") {
            for (let r = 0; r < this.matrix.length; r++) {
                for (let c = 0; c < this.matrix[r].length; c++) {
                    if (this.matrix[r][c].type === "Woods" && !(r === options.original.y && c === options.original.x)) {
                        this.matrix[r][c].canMoveHere = true
                    }
                }
            }
            // this.changeTileOpenStatus({ x: 0, y: 3 })
            // this.changeTileOpenStatus({ x: 4, y: 3 })
            // this.changeTileOpenStatus({ x: 2, y: 0 })
        }
    }

    getOuterRegionAsArray() {

        this.convertUpperRow()
        this.convertRightColumn()
        this.convertBottomRow()
        this.convertLeftColumn()

        return this.outerRegionAsArray
    }

    convertUpperRow() {
        for (let i = 0; i < this.matrix[0].length; i++) {
            this.outerRegionAsArray.push({
                coords: {
                    "x": i,
                    "y": 0
                },
                "type": this.matrix[0][i].type
            })
        }
    }

    convertRightColumn() {
        for (let i = 1; i < this.matrix.length; i++) {
            this.outerRegionAsArray.push({
                coords: {
                    "x": 4,
                    "y": i
                },
                "type": this.matrix[i][4].type
            })
        }
    }

    convertBottomRow() {
        for (let i = this.matrix[4].length - 2; i >= 0; i--) {
            this.outerRegionAsArray.push({
                coords: {
                    "x": i,
                    "y": 4
                },
                "type": this.matrix[4][i].type
            })
        }
    }

    convertLeftColumn() {
        for (let i = this.matrix.length - 2; i > 0; i--) {

            this.outerRegionAsArray.push({
                coords: {
                    "x": 0,
                    "y": i
                },
                "type": this.matrix[i][0].type
            })
        }
    }

    async populateAdventureCards() {
        const items = await dataDao.getItems()
        this.adventureCards = [...items]

        const followers = await dataDao.getFollowers()
        this.adventureCards.push(...followers)

        const enemies = await dataDao.getEnemies()   //removed enemies from deck for easier debugging
        this.adventureCards.push(...enemies)
    }

    async populateClassesArr() {
        const classesFromDB = await dataDao.getClasses()
        this.arrClasses.push(...classesFromDB)
    }

    drawAdventureCard() {
        let index = Math.floor(Math.random() * this.adventureCards.length)
        let card = this.adventureCards.splice(index, 1)
        if (!this.adventureCards.length) {
            this.populateAdventureCards()
        }
        return card
    }

    addRemovePlayerCard(modifyCardObject) {
        let player = this.players[modifyCardObject.player]
        if (modifyCardObject.action === "add") {
            this.addToPlayerStatsFromCard(player, modifyCardObject.card)
            player[modifyCardObject.card.type === "item" ? "inventory" : "followers"].push(modifyCardObject.card)
        }
        else {
            player[modifyCardObject.card.type === "item" ? "inventory" : "followers"].splice(modifyCardObject.index, 1)  //requires modifyCardObject to be sent with index of the item to be removed
            this.reducePlayerStatsFromLostCard(modifyCardObject.player, modifyCardObject.card)
        }
    }

    addToPlayerStatsFromCard(player, card) {
        if (card.type === "follower") { this.addStats(player, card) }
        else if (card.isStatic) { 
            card.isWeapon ? this.addWeaponStats(player, card) : this.addStats(player, card) }
        else { return }
    }

    addStats(player, card) {
        let stats = Object.keys(card.stats)
        for (let stat of stats) {
            if (card.stats[stat]) { player.stats[stat] += card.stats[stat] }
        }
    }

    reduceStats(player, card) {
        let stats = Object.keys(card.stats)
        for (let stat of stats) {
            if (card.stats[stats]) { 
                player.stats[stat] -= card.stats[stats]
                if (player.stats[stat] < 0) { player.stats[stat] = 0 }
            }
        }
    }

    addWeaponStats(player, card) {
        // if (player.class === "Warrior") { return this.addWeaponStatsToWarrior(player, card) }
        if (this.countPlayerWeapons(player) < 1) { this.addStats(player, card) }
        else if (this.isBiggerWeapon(card, this.findBiggestWeapon(player))) {
            this.replaceWeaponStats(card, player)
        }
        else { return }
    }

    reducePlayerStatsFromLostCard(player, card) {
        if (card.type === "follower") { this.reduceStats(player, card) }
        else if (card.isStatic) { 
            card.isWeapon ? this.removeWeaponStats(player, card) : this.reduceStats(player, card) }
        else { return }
    }

    removeWeaponStats(player, card) {
        // if (player.class === "Warrior") { return this.removeWeaponStatsFromWarrior(player, card) }
        if (this.countPlayerWeapons(player) < 2) { this.reduceStats(player, card) }
        else if (card.stats.strength >= this.findBiggestWeapon(player).stats.strength) {
            this.reduceWeaponStats(card, player)
        }
        else { return }
    }

    countPlayerWeapons(player) {
        let weapons = 0
        for (let item of player.inventory) {
            if (item.isWeapon) { weapons ++ }
        }
        return weapons
    }

    findBiggestWeapon(player) {
        if (this.countPlayerWeapons(player) < 1) { return null}
        let weapon = null
        for (let item of player.inventory) {
            if (!item.isWeapon) { continue }
            if (!weapon) { weapon = item }
            else if (item.stats.strength >= weapon.stats.strength) { weapon = item }
            else { continue }
        }
        return weapon
    }

    isBiggerWeapon(card, weapon) { return card.stats.strength > weapon.stats.strength }

    replaceWeaponStats(card, player) {
        player.stats.strength -= this.findBiggestWeapon(player).stats.strength
        player.stats.strength += card.stats.strength
    }

    reduceWeaponStats(card, player) {
        player.stats.strength -= card.stats.strength
        player.stats.strength += this.findBiggestWeapon(player).stats.strength
    }

    combat(player, attribute, oponent) {
        let attribute = attribute
        let playerScore = player.stats.attribute + rollDie(6)
        let oponentScore = oponent.attribute + rollDie(6)
        if (playerScore > oponentScore) { return "player wins" }
        else if (playerScore < oponentScore) { return "oponent wins" }
    }

    // changePlayerAttribute(player, attribute, value) {
    //     let attribute = attribute
    //     player.stats.attribute = value
    // }

    changePopupType(popupType) {
        this.popupType = popupType
    }

    subtractGold(itemObject) {
        let player = this.players[itemObject.player]
        player.stats.gold -= itemObject.num
    }
}

module.exports = Game

