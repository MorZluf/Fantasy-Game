const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TileSchema = new Schema({
    type: String,
    text: String,
    img: String
})

const Tile = mongoose.model("Tile", TileSchema)

module.exports = Tile
