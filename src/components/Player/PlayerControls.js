import React, { Component } from 'react';
import SinglePlayerControl from './SinglePlayerControl';

class PlayerControls extends Component {

    render() {
        return (
             <div className="player-controls">
                 <h5>Player Controls</h5>
                 <SinglePlayerControl text="control1"/>
                 <SinglePlayerControl text="control2"/>
                 <SinglePlayerControl text="control3"/>
                 <SinglePlayerControl text="control4"/>
             </div>
        )
    }
}

export default PlayerControls;