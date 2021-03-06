class Matrix {
    constructor(numRows, numColumns) {
        this.matrix = []
        this.generateMatrix(numRows, numColumns)
    }

    generateMatrix(numRows, numColumns) {

        for (let r = 0; r < numRows; r++) {
            this.matrix.push([])
            for (let c = 0; c < numColumns; c++) {
                this.matrix[r].push({
                    type: "Fields",
                    players: [],
                    canMoveHere: true
                })
            }
        }
    }

    getMatrix(rowNum, colNum) {
        return this.matrix[rowNum][colNum]
    }

    
    print() {
        
        for (let i = 0; i < this.matrix.length; i++) {
            let line = ""
            for (let j = 0; j < this.matrix[i].length; j++) {
                line += (this.matrix[i][j].type + "\t" + this.matrix[i][j].players + "\t")
            }
            
            console.log(line)
        }
    }
    
    printColumn(colNum) {
        for (let i = 0; i < this.matrix.length; i++) {
            console.log(this.matrix[i][colNum].type)
            console.log(this.matrix[i][colNum].players)
        }
    }
    
    printRow(rowNum) {
        for (let i = 0; i < this.matrix[rowNum].length; i++) {
            console.log(this.matrix[rowNum][i].type)
            console.log(this.matrix[rowNum][i].players)
        }
    }
    
    alter(row, column, newValue) {
        this.matrix[row][column] = newValue
    }

    findPlayerCoordinates(player) {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j].players.some(p => p === player)) {
                    return { x: j,
                             y: i }
                }
            }
        }
    }

}

module.exports = Matrix