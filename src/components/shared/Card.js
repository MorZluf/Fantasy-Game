import React, { Component } from 'react';

class Card extends Component {

    render() {
        return (
            <div className="player-enemy-card">
                fighting against {this.props.oponent}
            </div>
        )
    }
}

export default Card;