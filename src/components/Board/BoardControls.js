import React, { Component } from 'react';
import SingleBoardControl from './SingleBoardControl';
import '../../style/boardcontrols.css'
import RollDie from './RollDie';
import { observer, inject } from 'mobx-react';

@inject("gameStore")
@observer
class BoardControls extends Component {
    
    endTurn = () => this.props.gameStore.endTurn()

    canEndTurn = () => {
        return this.props.gameStore.clientState.isCurrentPlayer &&
        this.props.gameStore.clientState.movementMade
    }

    render() {
        return (<div className="board-controls">
                    <div className="player-name" 
                        style={{textAlign: this.props.gameStore.player.name === "Player_1" ? "left" : "right"}}>
                        {this.props.gameStore.game.players[this.props.gameStore.player.name].name}
                    </div>
                    <div className="board-actions">
                        <RollDie />
                    </div>
                    <button onClick={this.endTurn} style={{
                            visibility: this.canEndTurn() ? "visible" : "hidden",
                            textAlign: this.props.gameStore.player.name === "Player_1" ? "left" : "right"
                        }}>End turn</button>
            </div>)
    }
}

export default BoardControls;