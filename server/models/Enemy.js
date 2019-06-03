const mongoose = require("mongoose")
const Schema = mongoose.Schema

const EnemySchema= new Schema({
    type: String,
    title: String,
    img: String,
    text: String,
    stats: {
        strength: Number,
        craft: Number,
        life: Number,
        gold: Number
    }
})

const Enemy = mongoose.model("Enemy", EnemySchema)

module.exports = Enemy