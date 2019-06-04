const Class = require("../models/Class")
const Enemy = require("../models/Enemy")
const Game = require("../models/Game")
const Follower = require("../models/Follower")
const Tile = require("../models/Tile")
const Player = require("../models/Player")
const Item = require("../models/Item")
const unirest = require('unirest')     // Data Access Object - the actual DOer.
const constants = require('../../Config')
const APIKey = constants.API_KEY



class dataDao {
    constructor() {
        this.dummyWarrior = {
            name: "Warrior",
            img: "http://www.talismanwiki.com/wiki/images/thumb/9/97/Warrior.png/87px-Warrior.png",
            specialAbilities: ["best-of-two-battle-dice", "two-weapon-fighting"],
            stats: {
                strength: 4,
                craft: 2,
                life: 5,
                gold: 1,
                alingment: "neutral"
            }
        }
    }

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

    async populate(arrItems, arrFollowers, arrEnemies) {
        // for(let i = 0; i < 5; i ++) {
            for (let i = 0; i < arrItems.length; i++)
                await this.saveItemToDB(arrItems[i])
        // }

        // for(let i = 0; i < 4; i ++) {
            for (let i = 0; i < arrFollowers.length; i++)
                await this.saveFollowerToDB(arrFollowers[i])
        // }

        for (let i = 0; i < arrEnemies.length; i++)
            await this.saveEnemyToDB(arrEnemies[i])

        // this method being called in api.js
        console.log("populated")
    }

    async populateClasses(arrClasses){
        for (let i = 0; i < arrClasses.length; i++)
        await this.saveClassToDB(arrClasses[i])
    }


    // ----------------------------------------
    // GET methods
    // ----------------------------------------
    async getClasses() { return await Class.find({}) }
    async getClass() { return className === "Warrior" ? this.dummyWarrior : null } // async getClass(className) { return await Class.findOne({name: className})}
    async getGames() { return await Game.find({}) }
    async getItems() { return await Item.find({}) }
    async getFollowers() { return await Follower.find({}) }
    async getEnemies() { return await Enemy.find({}) }
    async getPlayers() { return await Player.find({}) }
    async getTiles() { return await Tile.find({}) }

    // ----------------------------------------
    // SAVE methods
    // ----------------------------------------
    async saveClassToDB(argClass) {
        let classToSave = new Class({
            name: argClass.name,
            img: argClass.img,
            specialAbilities: argClass.specialAbilities,
            stats: argClass.stats
        })
        classToSave.save()
        console.log(`saved class ${classToSave.name} to the database`)
    }

    async saveItemToDB(argItem) {
        let itemToSave = new Item({
            type: "item",
            title: argItem.title,
            img: argItem.img,
            text: argItem.text,
            stats: argItem.stats,
            isStatic: argItem.isStatic,
            isWeapon: argItem.isWeapon
        })
        itemToSave.save()
    }

    async saveFollowerToDB(argFollower) {
        let followerToSave = new Follower({
            type: "follower",
            title: argFollower.title,
            img: argFollower.img,
            text: argFollower.text,
            specialAbilities: argFollower.specialAbilities,
            stats: argFollower.stats
        })
        followerToSave.save()
    }

    async saveEnemyToDB(arrEnemies) {
        let enemyToSave = new Enemy({
            type: "enemy",
            title: arrEnemies.name,
            img: arrEnemies.imgGold,
            text: arrEnemies.flavor,
            stats: {
                strength: arrEnemies.attack,
                craft: null,
                life: null,
                gold: null
            }
        })
        enemyToSave.save()
    }

    async getEnemiesFromApi() {
        let data = await unirest.get("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/races/Dragon")
            .header("X-RapidAPI-Host", "omgvamp-hearthstone-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", APIKey)

        return data
    }

    async handleArrEnemies() {
        let data = await this.getEnemiesFromApi()
        let arrEnemies = data.body.filter(enemy => enemy.flavor)
        return arrEnemies
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

// let test = new dataDao()

// const testing = async function () {
//     await test.handleArrEnemies()
// }
// testing()

module.exports = dataDao