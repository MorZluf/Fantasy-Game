const express = require('express')
const Item = require('../models/Item')
const router = express.Router()
const DataDao = require("../utils/dataDao")
const dataDao = new DataDao()  

let arrItems = [
    {type: "item", title : "Sword", img:  "https://sabersmith.com/wp-content/uploads/2017/12/broadsword-satin.jpg", text: "When you have a sword add 1 to your strength", stats:{ strength: 1, craft: null, life: null, gold: null },isStatic: true},
    {type: "item", title: "Axe", img: "https://mcishop.azureedge.net/mciassets/w_5_0032493_oriental-dragon-battle-axe_550.png", text:"When you have an axe add 1 to your strength", stats:{ strength: 1, craft: null, life: null, gold: null }, isStatic: true},
    {type: "item", title: "Potion", img: "https://cdna.artstation.com/p/assets/images/images/009/955/302/large/alex-edwards-green-potion-effect.jpg?1521754125", text:"Use this item to add 1 to your life", stats:{ strength: null, craft: null, life: 1, gold: null }, isStatic: false},
    {type: "item", title: "Bag Of Gold", img: "http://www.thegoldqueen.com/wp-content/uploads/2011/03/bag-with-dollars-money-on-pile-of-golden-coins-vector.jpg", text:"Use this item to add 1 to your gold", stats:{ strength: null, craft: null, life: null, gold: 1 }, isStatic: false}
]

let arrFollowers = [
    {type: "follower", title: "Blacksmith", img: "https://sitejerk.com/images/blacksmith-png-6.png", text: "While the blacksmith follows you add 1 to your strength", specialAbilities: [], stats: {strength: 1, craft: null, life: null, gold: null}},
    {type: "follower", title: "Unicorn", img: "https://gamepedia.cursecdn.com/dx2shinmegamitensei_gamepedia_en/thumb/7/7e/Unicorn.png/1200px-Unicorn.png", text: "While the unicorn follows you add: 1 strength, 1 craft", specialAbilities: [], stats: {strength: 1, craft: 1, life: null, gold: null}},
    {type: "follower", title: "Leprechaun", img: "https://image.spreadshirtmedia.com/image-server/v1/mp/designs/1012572415,width=178,height=178,version=-1723906061/feast-of-saint-patrick-leprechaun-pot-gold-coins.png", text: "When the leprechaun joins you, gain 3 gold", specialAbilities: [], stats: {strength: null, craft: null, life: null, gold: 3}}
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

router.put('/items', function( req,res) {
    dataDao.populate(arrItems)
    res.send("db populated")
})

router.put('/adventureCards', async function ( req, res){
    let arrEnemies = await dataDao.handleArrEnemies()
    dataDao.populate(arrItems, arrFollowers, arrEnemies)
    res.send("db populated with items, followrs and enemies")
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