const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    type: String,
    title: String,
    img: String,
    text: String,
    stats: {
        strength: Number,
        craft: Number,
        life: Number,
        gold: Number
    },
    isStatic: Boolean,
    isWeapon: Boolean
})

const Item = mongoose.model("Item", ItemSchema)

module.exports = Item