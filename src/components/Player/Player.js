import React, { Component } from 'react';
import PlayerControls from './PlayerControls';

class Player extends Component {

    render() {
        return (
             <div className="player-container">{this.props.player}
             <PlayerControls />
             </div>

        )
    }
}

export default Player;