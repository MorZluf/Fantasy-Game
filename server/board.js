class Board extends Matrix {
    constructor(numRows, numColumns) {
        super(numRows, numColumns)
        this.arr = []
        this.alter(0, 0, "player 1")
        this.alter(0, 6, "player 2")
    }


    rollDie() {
        let dieRoll = Math.floor(Math.random() * Math.floor(6) + 1)
        return dieRoll
    }

    movePlayer(player, newPosition) {
        let position = this.findCoordinate(player)
        let rollScore = rollDie()
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