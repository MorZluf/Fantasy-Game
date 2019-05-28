import React, { Component } from 'react';
import SingleBoardControl from './SingleBoardControl';
import '../../style/boardcontrols.css'


class BoardControls extends Component {

    render() {
        return (
            <div className="board-controls">
                <h5>Board Controls</h5>
                <SingleBoardControl text="roll_a_die" />
                <SingleBoardControl text="Pick_card" />
                <SingleBoardControl text="Buy" />
                <SingleBoardControl text="DoSomething" />
            </div>
        )
    }
}

export default BoardControls;