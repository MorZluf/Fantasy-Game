const Matrix = require('./matrix')
const Class = require('../server/models/Class')
const DataDao = require('./utils/dataDao')
const dataDao = new DataDao()
class Game extends Matrix {
    constructor(numRows, numColumns) {
        super(numRows, numColumns)
        this.players = {"Player_1" :
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
            "Player_2" :
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
        this.populateAdventureCards()
        this.setInitialBoard()
        this.populateClassesArr()
    }

    getPlayers() {
        return this.players
    }

    resetPopup() {
        this.popupType = ""
    }

    setInitialBoard() {
        this.addPlayerToTile("Player_1", { x: 0, y: 2 })
        this.addPlayerToTile("Player_2", { x: 4, y: 2 }) // TODO: change x:0, y:5 --> x:6 y:3  // changed for combat troubleshooting
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


        this.fillCenter()
        this.closeAllTiles()
    }

    async setPlayers(clientName, playerName, className) {
        let selectedClass = await this.findSelectedClass(className) 

        this.players[clientName] = {
                name: playerName,
                class: className,
                stats: {
                    strength: selectedClass[0].stats.strength,
                    craft: selectedClass[0].stats.craft,
                    life: selectedClass[0].stats.life,
                    gold: selectedClass[0].stats.gold,
                },
                inventory: [],
                followers: [],
                collectedEnemies: []
            }
        }

    async findSelectedClass(className){
        let selectedClass = await Class.find({name: className})
        return selectedClass
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
            let dieRoll = Math.floor(Math.random() * Math.floor(dieType) + 1) // TODO: changed Math.floor(6) -->  Math.floor(6) for combat troubleshooting
        return dieRoll
    }

    getPossibleMovement(player) {
        let position = this.findPlayerCoordinates(player)

        let index
        this.movementDie = Number(this.rollDie(4))

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
                option2: this.outerRegionAsArray[this.outerRegionAsArray.length - rest]
            }
        }
        else if (index + this.movementDie > (this.outerRegionAsArray.length - 1)) {
            let rest = this.movementDie - (this.outerRegionAsArray.length - index)
            return {
                option1: this.outerRegionAsArray[rest],
                option2: this.outerRegionAsArray[index - this.movementDie]
            }
        }
        else {

            return {
                option1: this.outerRegionAsArray[index + this.movementDie],
                option2: this.outerRegionAsArray[index - this.movementDie]
            }
        }
    }

    setPossibleMovement(player) {
        let options = this.getPossibleMovement(player.name)
        this.changeTileOpenStatus(options.option1.coords)
        this.changeTileOpenStatus(options.option2.coords)
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

        const enemies = await dataDao.getEnemies()
        this.adventureCards.push(...enemies)
    }

    async populateClassesArr(){
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

    combat(player, attribute, oponent) {
        let attribute = attribute
        let playerScore = player.stats.attribute + rollDie(6)
        let oponentScore = oponent.attribute + rollDie(6)
        if (playerScore > oponentScore) { return "player wins" }
        else if (playerScore < oponentScore) { return "oponent wins" }
    }

    changePlayerAttribute(player, attribute, value) {
        let attribute = attribute
        player.stats.attribute = value
    }

    changePopupType(popupType) {
        this.popupType = popupType
    }



}

module.exports = Game

let game = new Game(5, 5)

// const testing = async function() {
//     let res = await game.findSelectedClass("Troll")
//     console.log(res)
//     console.log(res[0].stats.strength)
// }
// testing()