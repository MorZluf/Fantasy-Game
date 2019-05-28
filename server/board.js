const Matrix = require ('./matrix')
const DataDao = require('./utils/dataDao')
const dataDao = new DataDao() 
class Board extends Matrix {
    constructor(numRows, numColumns) {
        super(numRows, numColumns)
        this.arr = []
        this.alter(0, 0, "player_1")
        this.alter(0, 6, "player_2")
        this.outerRegionAsArray = []
        this.adventureCards = []
    }


    rollDie() {
        let dieRoll = Math.floor(Math.random() * Math.floor(6) + 1)
        return dieRoll
    }

    movePlayer(player, newPosition) {
        let position = this.findCoordinate(player)
        let rollScore = rollDie()
    }

    getOuterRegionAsArray(){

        this.convertUpperRow()
        this.convertRightColumn()
        this.convertBottomRow()
        this.convertLeftColumn()
    
        console.log(this.outerRegionAsArray)
    }

    convertUpperRow() {
        for (let i = 0; i < this.matrix.length; i++){
            this.outerRegionAsArray.push({
                "x": 0,
                "y": i,
                "type": this.matrix[0][i].type
            })
        }
    }

    convertRightColumn() {
        for (let i = 1; i < this.matrix.length; i++){
            this.outerRegionAsArray.push({
                "x": i,
                "y": 6,
                "type":this.matrix[i][6].type
            })
        }
    }

    convertBottomRow(){
        for(let i = this.matrix.length - 2; i >= 0; i--){
            this.outerRegionAsArray.push({
                "x": 6,
                "y": i,
                "type":this.matrix[i][6].type 
            })
        }
    }

    convertLeftColumn(){
        for(let i = this.matrix.length - 2; i > 0; i--){
            this.outerRegionAsArray.push({
                "x": i,
                "y": 0,
                "type":this.matrix[i][0].type 
            })
        }
    }

    async populateAdventureCards() {
        const items = await dataDao.getItems()
        this.adventureCards = [...items]
    }

    drawAdventureCard() {
        let index = Math.floor(Math.random() * this.adventureCards.length)
        return this.adventureCards.splice(index, 1)
    }

    combat(player, attribute, oponent) {
        let attribute = attribute
        let playerScore = player.stats.attribute + rollDie()
        let oponentScore = oponent.attribute + rollDie()
        if (playerScore > oponentScore) { return "player wins" }
        else if (playerScore < oponentScore) { return "oponent wins"}
    }

    changePlayerAttribute(player, attribute, value) {
        let attribute = attribute
        player.stats.attribute = value
    }

}

let board = new Board (7, 7)
console.log(board.getOuterRegionAsArray())
board.populateAdventureCards()
console.log(board.drawAdventureCard())
console.log(board.drawAdventureCard())