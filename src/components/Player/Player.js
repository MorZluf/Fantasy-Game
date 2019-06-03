import React, { Component } from 'react';
import PlayerControls from './PlayerControls'
import '../../style/playerboard.css'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer

class Player extends Component {
    checkCurrentPlayer = () => this.props.client === this.props.gameStore.currentPlayer.name

    endTurn = () => this.props.gameStore.endTurn()

    canEndTurn = () => this.checkCurrentPlayer() && 
        this.props.gameStore.clientState.isCurrentPlayer &&
        this.props.gameStore.clientState.movementMade

    render() {
        const player = this.props.player
        return (
             <div className={this.checkCurrentPlayer() ? "current-player player-board" : "player-board"}>{player.name} ({this.props.client})
             <PlayerControls player={player}/>
             <button onClick={this.endTurn} style={{visibility: this.canEndTurn() ? "visible" : "hidden"}}>End turn</button>
             </div>

        )
    }
}

export default Player;