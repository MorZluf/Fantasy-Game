import React, { Component } from 'react';
import PlayerControls from './PlayerControls';
import '../../style/playerboard.css'

class Player extends Component {

    render() {
        return (
             <div className="player-board">{this.props.player}
             <PlayerControls />
             </div>

        )
    }
}

export default Player;