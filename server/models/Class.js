const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClassSchema = new Schema({
    name: String,
    img: String,
    specialAbilities: [],
    stats: {
        strength: Number,
        craft: Number,
        life: Number,
        gold: Number,
        alignment: String,
        start: { 
            // starting position of a player   
            x: Number,
            y: Number
        }
    }
})

const Class = mongoose.model("Class", ClassSchema)

module.exports = Class