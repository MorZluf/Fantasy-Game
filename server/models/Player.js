const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PlayerSchema = new Schema({
    name: String,
    class: {type: Schema.Types.ObjectId, ref: 'Class'},
    inventory: [{type: Schema.Types.ObjectId, ref: 'Item'}],
    followers: [{type: Schema.Types.ObjectId, ref: 'Follower'}],
    collectedEnemies: [{type: Schema.Types.ObjectId, ref: 'Enemy'}],
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