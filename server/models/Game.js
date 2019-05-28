const mongoose = require("mongoose")
const Schema = mongoose.Schema

const GameSchema= new Schema({
    room: String,
    board : [],
    players : [],
    adventureCards: [],
    spellCards: [],
    purchaseCards: [],
    currentPlayer: String
})

const Game = mongoose.model("Game", GameSchema)

module.exports = Game