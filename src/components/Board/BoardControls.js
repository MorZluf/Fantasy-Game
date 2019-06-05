import React, { Component } from 'react';
import SingleBoardControl from './SingleBoardControl';
import '../../style/boardcontrols.css'
import RollDie from './RollDie';
import { observer, inject } from 'mobx-react';

@inject("gameStore")
@observer
class BoardControls extends Component {

    render() {
        return (<div className="board-controls">
                    <div className="player-name" 
                        style={{textAlign: this.props.gameStore.player.name === "Player_1" ? "left" : "right"}}>
                        {this.props.gameStore.game.players[this.props.gameStore.player.name].name}
                    </div>
                    <div className="board-actions">
                        <RollDie />
                    </div>
            </div>)
    }
}

export default BoardControls;