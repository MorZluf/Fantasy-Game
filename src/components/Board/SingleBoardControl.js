import React, { Component } from 'react';

class SingleBoardControl extends Component {

    render() {
        return (
            <div>
                <button className="single-board-control">{this.props.text}</button>
            </div>
        )
    }
}

export default SingleBoardControl;