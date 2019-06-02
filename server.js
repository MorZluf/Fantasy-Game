const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./server/routes/api')
const socketIo = require('socket.io')
const PlayerHandler = require('./server/player-handler')
const Game = require('./server/game')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/fantasydb', { useNewUrlParser: true })


const app = express()
app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
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

let game = new Game(5, 5)
// game.populateAdventureCards()
game.getOuterRegionAsArray()

const io = socketIo(server)
const handlePlayers = new PlayerHandler()
rooms = ["room1"]

io.on("connection", function (socket) {
    console.log("New connection on socket id:" + socket.id)
    let room = rooms[0]
    socket.join(room)
    socket.emit('player-data', handlePlayers.addPlayer(socket, room))
    socket.emit('new-game-board', game)

    socket.on('move-player', function (moveData) {
        game.movePlayer(moveData)
        io.sockets.in(room).emit('update-game-to-client', game)
    })

    socket.on('roll-movement', function (player) {
        game.setPossibleMovement(player)
        io.sockets.in(room).emit('update-game-to-client', game)
    })

    socket.on('change-popup-type', function(popupType) {
        game.changePopupType(popupType)
        io.sockets.in(room).emit('update-game-to-client', game)
    })

    socket.on('draw-adventure-card', function() {
        let drawnCard = game.drawAdventureCard()[0]
        io.sockets.in(room).emit('adventure-card-drawn', drawnCard)
    })

    socket.on('close-popup-to-server', function () {
        game.resetPopup()
        io.sockets.in(room).emit('update-game-to-client', game)
    })

    socket.on('end-turn', function () {
        let newPlayer = handlePlayers.advanceTurn(room)
        io.sockets.in(room).emit('new-turn', newPlayer)
    })
    
    socket.on('change-game-started-to-started', function (players) {
        let playerStats = {
            player1 : players.chosenPlayer,
            player2 : players.currentPlayer,
            rolledDie1 : -1,
            rolledDie2 : -1,
            isStarted: true
        }
        io.sockets.in(room).emit('update-fight-stats', playerStats)
    })
    socket.on('enable-show-fight-screen', function (){
        game.enableFightScreen()
        io.sockets.in(room).emit('show-fight-screen')
    })
    socket.on('player-vs-player', function (players) {
        let playerStats = {
            player1 : players.chosenPlayer,
            player2 : players.currentPlayer,
            rolledDie1 : -1,
            rolledDie2 : -1,
            isStarted: false
        }
        io.sockets.in(room).emit('initialize-player-vs-player-fightstats', playerStats)
    })

    socket.on('disconnect', function (socket) {
        handlePlayers.removePlayer(socket, room)
    })
})