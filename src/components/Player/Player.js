import React, { Component } from 'react';
import PlayerControls from './PlayerControls'
import '../../style/playerboard.css'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer

class Player extends Component {
    checkCurrentPlayer = () => this.props.player === this.props.gameStore.currentPlayer.name

    getPlayerData = () => this.props.gameStore.getPlayerData(this.props.player)

    endTurn = () => this.props.gameStore.endTurn()

    render() {
        const player = this.getPlayerData()
        return (
             <div className={this.checkCurrentPlayer() ? "current-player player-board" : "player-board"}>{player.name} ({this.props.player})
             <PlayerControls player={player}/>
             <button onClick={this.endTurn} style={{visibility: this.checkCurrentPlayer() ? "visible" : "hidden"}}>End turn</button>
             </div>

        )
    }
}

export default Player;