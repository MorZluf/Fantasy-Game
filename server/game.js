const Matrix = require ('./matrix')

const DataDao = require('./utils/dataDao')
const dataDao = new DataDao() 
class Game extends Matrix {
    constructor(numRows, numColumns) {
        super(numRows, numColumns)
        this.setInitialBoard()
        this.outerRegionAsArray = []
        this.adventureCards = []
    }

    setInitialBoard() {
        this.addPlayerToTile("Player_1", {x: 0, y: 3})
        this.addPlayerToTile("Player_2", {x: 6, y: 3})
        this.changeTileType("Village", {x: 0, y: 0})
        this.changeTileType("Village", {x: 6, y: 0})
        this.changeTileType("Village", {x: 0, y: 6})
        this.changeTileType("Village", {x: 6, y: 6})
        this.fillCenter()
    }

    fillCenter() {
        for (let r = 1; r < this.matrix.length - 1; r++) {
            for (let c = 1; c < this.matrix[r].length - 1; c++) {
                this.matrix[r][c].type = "Center"
            }
        }
    }

    addPlayerToTile(player, position) {
        this.matrix[position.y][position.x].players.push(player)
    }

    changeTileType(type, position) {
        this.matrix[position.y][position.x].type = type
    }

    rollDie() {
        let dieRoll = Math.floor(Math.random() * Math.floor(6) + 1)
        return dieRoll
    }

    getPossibleMovement(player, dieRoll1) {
        let position = this.findPlayerCoordinates(player)

        let index
        let dieRoll = Number(dieRoll1)
        
        for(let pos in this.outerRegionAsArray){
            if(this.outerRegionAsArray[pos].x === position.x && 
                this.outerRegionAsArray[pos].y === position.y){
                    index = Number(pos)
                    break
            }
        }
        if (index < dieRoll){
            let rest = dieRoll - index
            return{
                "option1": this.outerRegionAsArray[parseInt(index + dieRoll)],
                "option2": this.outerRegionAsArray[this.outerRegionAsArray.length - rest]    
            }
        }
        else if (index + dieRoll > (this.outerRegionAsArray.length - 1)){
            let rest = dieRoll - (this.outerRegionAsArray.length - index)
            return{
                "option1": this.outerRegionAsArray[rest],
                "option2": this.outerRegionAsArray[index - dieRoll]
            }
        }
        else{
            
            return{
                "option1": this.outerRegionAsArray[index + dieRoll],
                "option2": this.outerRegionAsArray[index - dieRoll]
            }
        }
    }


    getOuterRegionAsArray(){

        this.convertUpperRow()
        this.convertRightColumn()
        this.convertBottomRow()
        this.convertLeftColumn()    

        return this.outerRegionAsArray
    }

    convertUpperRow() {
        for (let i = 0; i < this.matrix[0].length; i++){
            this.outerRegionAsArray.push({
                "x": i,
                "y": 0,
                "type": this.matrix[0][i].type
            })
        }
    }

    convertRightColumn() {
        for (let i = 1; i < this.matrix.length; i++){
            this.outerRegionAsArray.push({
                "x": 6,
                "y": i,
                "type":this.matrix[i][6].type
            })
        }
    }

    convertBottomRow(){
        for(let i = this.matrix[6].length - 2; i >= 0; i--){
            this.outerRegionAsArray.push({
                "x": i,
                "y": 6,
                "type":this.matrix[6][i].type 
            })
        }
    }

    convertLeftColumn(){
        for(let i = this.matrix.length - 2; i > 0; i--){

            this.outerRegionAsArray.push({
                "x": 0,
                "y": i,
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

module.exports = Game

let game = new Game (7, 7)
game.getOuterRegionAsArray()
console.log(game.findPlayerCoordinates("Player_2"))
console.log(game.getPossibleMovement("Player_2", 5))