const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PlayerSchema = new Schema({
    name: String,
    class: String, // ID
    inventory: [], // array of ids
    followers: [], // array of ids
    collectedEnemies: [], // array of ids
    stats: {
        strength: Number,
        craft: Number,
        gold: Number,
        life: Number,
        alignment: String
    }
})

const Player = mongoose.model("Player", PlayerSchema)

module.exports = Player