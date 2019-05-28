const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ItemSchema = new Schema({
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

const Item = mongoose.model("Item", ItemSchema)

module.exports = Item