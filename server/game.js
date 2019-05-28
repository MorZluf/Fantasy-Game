const Matrix = require ('./matrix')
class Game extends Matrix {
    constructor(numRows, numColumns) {
        super(numRows, numColumns)
        this.alter(0, 0, "player_1")
        this.alter(0, 6, "player_2")
        this.outerRegionAsArray = []
    }


    rollDie() {
        let dieRoll = Math.floor(Math.random() * Math.floor(6) + 1)
        return dieRoll
    }

    getPossibleMovement(player, dieRoll) {
        let position = this.findCoordinate(player)

        let index
        
        for(let pos in this.outerRegionAsArray){
            if(this.outerRegionAsArray[pos].x === position.x && 
                this.outerRegionAsArray[pos].y === position.y){
                    index = pos
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
            let rest = this.outerRegionAsArray.length - 1 + dieRoll - index
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


    drawAdventureCard() {

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

let game = new Game (7, 7)
game.getOuterRegionAsArray()
console.log(game.getPossibleMovement("player_2", 3))
console.log(game.findCoordinate("player_2"))
