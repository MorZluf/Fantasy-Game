const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./server/routes/api')
const socketIo = require('socket.io')
const PlayerHandler = require('./server/player-handler')
const Game = require('./server/game')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/fantasydb', {useNewUrlParser: true})


const app = express()
app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
app.use('/', api)


const port = 8000
const server = app.listen(port, function () {
    console.log(`Server running on port ${port}`)
})

let game = new Game(7, 7)
game.populateAdventureCards()
game.getOuterRegionAsArray()

const io = socketIo(server)
const handlePlayers = new PlayerHandler()
rooms = ["room1"]

io.on("connection", function(socket) {
    console.log("New connection on socket id:" + socket.id)
    let room = rooms[0]
    socket.join(room)
    socket.emit('player-data', handlePlayers.addPlayer(socket))
    socket.emit('new-game-board', game)

    socket.on('move-player', function (moveData) {
        game.movePlayer(moveData)
        io.sockets.in(room).emit('update-game-to-client', game)
    })

    socket.on('end-turn', function() {
        let newPlayer = handlePlayers.advanceTurn()
        console.log(newPlayer)
        io.sockets.in(room).emit('new-turn', newPlayer)
    })

    socket.on('disconnect', function (socket) {
        handlePlayers.removePlayer(socket)
    })
})