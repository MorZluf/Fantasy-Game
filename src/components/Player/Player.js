import React, { Component } from 'react';
import PlayerControls from './PlayerControls';

class Player extends Component {

    render() {
        return (
             <div>{this.props.player}
             <PlayerControls />
             </div>

        )
    }
}

export default Player;