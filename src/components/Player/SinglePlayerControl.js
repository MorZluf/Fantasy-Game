import React, { Component } from 'react';

class SinglePlayerControl extends Component {

    render() {
        return (
            <div >
                <button className="player-single-control"> {this.props.text}</button>
            </div>
        )
    }
}

export default SinglePlayerControl;