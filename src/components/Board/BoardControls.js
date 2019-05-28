import React, { Component } from 'react';
import SingleBoardControl from './SingleBoardControl';

class BoardControls extends Component {

    render() {
        return (
            <div>
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