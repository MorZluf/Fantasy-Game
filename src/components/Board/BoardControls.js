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
                <div className="player-name">{this.props.gameStore.player.name}</div>
                <div className="board-actions">
                    <RollDie text="roll_a_die" />
                    <SingleBoardControl text="Pick_card" />
                    <SingleBoardControl text="Buy" />
                    <SingleBoardControl text="DoSomething" />
                </div>
            </div>)
    }
}

export default BoardControls;