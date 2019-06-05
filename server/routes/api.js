const express = require('express')
const Item = require('../models/Item')
const router = express.Router()
const DataDao = require("../utils/dataDao")
const dataDao = new DataDao()  

let arrItems = [
    {type: "item", title: "Bag Of Gold", img: "https://thumbs.gfycat.com/DimwittedGrayFawn-max-1mb.gif", text:"Add 1 to your gold", stats:{ strength: null, craft: null, life: null, gold: 1 }, isStatic: true},
    {type: "item", title: "Bag Of Gold", img: "https://thumbs.gfycat.com/DimwittedGrayFawn-max-1mb.gif", text:"Add 1 to your gold", stats:{ strength: null, craft: null, life: null, gold: 1 }, isStatic: true},
    {type: "item", title: "Bag Of Gold", img: "https://thumbs.gfycat.com/DimwittedGrayFawn-max-1mb.gif", text:"Add 1 to your gold", stats:{ strength: null, craft: null, life: null, gold: 1 }, isStatic: true},
    {type: "item", title: "Bag Of Gold", img: "https://thumbs.gfycat.com/DimwittedGrayFawn-max-1mb.gif", text:"Add 1 to your gold", stats:{ strength: null, craft: null, life: null, gold: 1 }, isStatic: true},
    {type: "item", title: "Bag Of Gold", img: "https://thumbs.gfycat.com/DimwittedGrayFawn-max-1mb.gif", text:"Add 1 to your gold", stats:{ strength: null, craft: null, life: null, gold: 1 }, isStatic: true},
    {type: "item", title: "Bag Of Gold", img: "https://thumbs.gfycat.com/DimwittedGrayFawn-max-1mb.gif", text:"Add 1 to your gold", stats:{ strength: null, craft: null, life: null, gold: 1 }, isStatic: true},
    {type: "item", title: "Solomon's Crown", img: "http://www.kingsolomonslv.com/wp-content/uploads/2018/08/Solomon.png", text: "Add 2 to your strength", stats:{ strength: 2, craft: null, life: null, gold: null}, isStatic: true},
    {type: "item", title: "Belt Of Strength", img: "https://sostalisman-retailer.co.uk/wp-content/uploads/ST02-1100-2017.png", text: "Add 2 to your strength", stats:{ strength: 2, craft: null, life: null, gold: null}, isStatic: true},
    {type: "item", title: "Talisman", img: "https://i.imgur.com/N6FzL6p.gif", text: "Only if you have a Talisman you may attack the guardian", stats:{ strength: null, craft: null, life: null, gold: null}, isStatic: true},
    {type: "item", title: "Talisman", img: "https://i.imgur.com/N6FzL6p.gif", text: "Only if you have a Talisman you may attack the guardian", stats:{ strength: null, craft: null, life: null, gold: null}, isStatic: true},
    {type: "item", title: "Cloak Of Might", img: "https://hmoon.com/wp-content/uploads/2017/02/SL-Cloak.png", text: "Add 2 to your strength", stats:{strength: 2, craft: null, life: null, gold: null}, isStatic: true}
]

let arrFollowers = [
    {type: "follower", title: "Blacksmith", img: "https://sitejerk.com/images/blacksmith-png-6.png", text: "Add 1 to your strength", specialAbilities: [], stats: {strength: 1, craft: null, life: null, gold: null}},
    {type: "follower", title: "Unicorn", img: "https://gamepedia.cursecdn.com/dx2shinmegamitensei_gamepedia_en/thumb/7/7e/Unicorn.png/1200px-Unicorn.png", text: "Add 1  to your strength", specialAbilities: [], stats: {strength: 1, craft: 1, life: null, gold: null}},
    {type: "follower", title: "Leprechaun", img: "https://image.spreadshirtmedia.com/image-server/v1/mp/designs/1012572415,width=178,height=178,version=-1723906061/feast-of-saint-patrick-leprechaun-pot-gold-coins.png", text: "Add 3 to your gold", specialAbilities: [], stats: {strength: null, craft: null, life: null, gold: 3}},
    {type: "follower", title: "Direwolf", img: "http://www.dododex.com/media/creature/direwolf.png", text: "Add 2 to your strength", specialAbilities: [], stats: {strength: 2, craft: null, life: null, gold: null}},
    
    
]

let arrClasses = [
    {name: "Warrior", img: "http://www.talismanwiki.com/wiki/images/9/97/Warrior.png", specialAbilities: ["You may roll two dice in battle and use the highter roll to determine your attack score.", "You may use two weapons at the same time"], stats: {strength: 4, craft: 2, life: 5, gold: 1}},
    {name: "Troll", img: "http://www.talismanwiki.com/wiki/images/f/f3/Troll.png", specialAbilities: ["Whenever you roll a 4 for your move, you may regenerate instead of moving. if you choose to regenerate, heal one life and end your turn"], stats: {strength: 6, craft: 1, life: 6, gold: 1}},
    {name: "Elf", img: "http://www.talismanwiki.com/wiki/images/8/89/Elf.png", specialAbilities: ["You may evade creatures and characters in the woods.", "If you're on a 'woods' tile, instead of rolling the die for your move, you may move to any other 'woods' tile"], stats: {strength: 3, craft: 4, life: 4, gold: 1}}
    
]

router.get('/sanity', function (req, res) {
    res.send("OK!")
})

// ------------------------------------------
// List of requests of 
//      - dropping schemas
//      - populate with dummy data
//      - resetdb
// ------------------------------------------

router.put('/resetdb', function (req, res) {
    dataDao.clearDB()
    dataDao.populate(dummyData)
})

router.put('/drop', function (req, res) {
    dataDao.clearDB()
    res.send("db dropped")
})

router.put('/adventureCards', async function ( req, res){
    let arrEnemies = await dataDao.handleArrEnemies()
    dataDao.populate(arrItems, arrFollowers, arrEnemies)
    res.send("db populated with items, followers and enemies")
})

router.put('/classes', async function (req, res){
    dataDao.populateClasses(arrClasses)
    res.send("db populated with classes")
})
// ------------------------------------------
// GET methods
// ------------------------------------------
router.get('/classes', async function (req, res) {
    const arrClasses = await dataDao.getClasses()
    res.send(arrClasses)
})

router.get('/classes/:className', async function (req, res) {
    const classData = await dataDao.getClass(req.params.className)
    res.send(classData)
})

router.get('/enemies', async function (req, res) {
    const arrClasses = await dataDao.getEnemies()
    res.send(arrClasses)
})

router.get('/items', async function (req, res) {
    const arrClasses = await dataDao.getItems()
    res.send(arrClasses)
})

router.get('/games', async function (req, res) {
    const arrClasses = await dataDao.getGames()
    res.send(arrClasses)
})

router.get('/tiles', async function (req, res) {
    const arrClasses = await dataDao.getTiles()
    res.send(arrClasses)
})

router.get('/players', async function (req, res) {
    const arrClasses = await dataDao.getPlayers()
    res.send(arrClasses)
})

router.get('/followers', async function (req, res) {
    const arrClasses = await dataDao.getFollowers()
    res.send(arrClasses)
})

// -------------------------------------
// POST methods
// -------------------------------------

router.post('/game', async function (req, res) {
    let gameToSave = req.body
    dataDao.saveGameToDB(gameToSave)
    res.send()
})

router.post('/player', async function (req, res) {
    let playerToSave = req.body
    dataDao.savePlayerToDB(playerToSave)
    res.send()
})

module.exports = router