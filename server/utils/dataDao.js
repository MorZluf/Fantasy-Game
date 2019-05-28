const Class = require("../models/Class")
const Enemy = require("../models/Enemy")
const Game = require("../models/Game")
const Follower = require("../models/Follower")
const Tile = require("../models/Tile")
const Player = require("../models/Player")
const Item = require("../models/Item")

class dataDao {
    constructor() { }

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

    async populate(arrData) {
        for (let i = 0; i < arrData.length; i++)
            await this.saveItemToDB(arrData[i])

        // this method being called in api.js
        
        console.log("populated")
    }

    // ----------------------------------------
    // GET methods
    // ----------------------------------------
    async getClasses() { return await Class.find({}) }
    async getGames() { return await Game.find({}) }
    async getItems() { return await Item.find({}) }
    async getFollowers() { return await Follower.find({}) }
    async getEnemies() { return await Enemy.find({}) }
    async getPlayers() { return await Player.find({}) }
    async getTiles() { return await Tile.find({}) }

    // ----------------------------------------
    // SAVE methods
    // ----------------------------------------
    async saveItemToDB(argItem) {
        let itemToSave = new Item({
            title: argItem.title,
            img: argItem.img,
            text: argItem.text,
            stats: argItem.stats,
            isStatic: argItem.isStatic
        })
        itemToSave.save()
        console.log(`game with ${itemToSave._id} was saved.`)
    }

    async savePlayerToDB(argPlayer) {
        let player = new Player({
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