import React, { Component } from 'react';
import PlayerControls from './PlayerControls'
import '../../style/playerboard.css'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer

class Player extends Component {
    checkCurrentPlayer = () => this.props.player === this.props.gameStore.currentPlayer.name

    render() {
        return (
             <div className={this.checkCurrentPlayer() ? "current-player player-board" : "player-board"}>{this.props.player}
             <PlayerControls />
             </div>

        )
    }
}

export default Player;