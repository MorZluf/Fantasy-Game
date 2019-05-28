const Class = require("../models/Class")
const Enemy = require("../models/Enemy")
const Game = require("../models/Game")
const Follower = require("../models/Follower")
const Tile = require("../models/Tile")
const Player = require("../models/Player")
const Item = require("../models/Item")

class dataDao {
    constructor() {}

    async clearDB() {
        console.log("dropping collections: Item, Class, Enemy, Game, Follower, Tile, Player ")
        Item.collection.drop()
        Class.collection.drop()
        Enemy.collection.drop()
        Game.collection.drop()
        Follower.collection.drop()
        Tile.collection.drop()
        Player.collection.drop()
    }

    async populate(arr) {
        // arr.forEach(element => this.saveToDB(element)); 
        // ^ this is an example of how does it suppouse to look like

        // this method being called in api.js
        console.log("ToDo: populate with dummy/real data")
    }


    // ----------------------------------------
    // GET methods
    // ----------------------------------------
    getClasses = async () => await Class.find({})
    getGames = async () => await Game.find({})
    getItems = async () => await Item.find({})
    getFollowers = async () => await Follower.find({})
    getEnemies = async () => await Enemy.find({})
    getPlayers = async () => await Player.find({})
    getTiles = async () => await Tile.find({})

    // ----------------------------------------
    // SAVE methods
    // ----------------------------------------
    async savePlayerToDB(argPlayer) {
        let player = new Game({
            name: argPlayer.name,
            class: argPlayer.class,
            inventory: argPlayer.inventory,
            followers: argPlayer.followers,
            collectedEnemies: argPlayer.collectedEnemies,
            stats: argPlayer.stats
        })
        player.save()
        console.log(`game with ${player._id} was saved.`)
    }

    async saveGameToDB(argGame) {
        let game = new Game({
            room: argGame.room,
            board: argGame.board,
            players: argGame.players,
            adventureCards: argGame.adventureCards,
            spellCards: argGame.spellCards,
            purchaseCards: argGame.purchaseCards,
            currentPlayer: argGame.currentPlayer
        })
        game.save()
        console.log(`game with ${game._id} was saved.`)
    }
}

module.exports = dataDao