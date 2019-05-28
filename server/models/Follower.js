const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FollowerSchema= new Schema({
    title: String,
    img: String,
    text: String,
    specialAbilities: [], // array of strings of ids of hardCoded functions
    stats: {
        strength: Number,
        craft: Number,
        life: Number,
        gold: Number
    }
})

const Follower = mongoose.model("Follower", FollowerSchema)

module.exports = Follower