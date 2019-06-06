import React, { Component } from 'react';

class PlayerStat extends Component {

    render() {
        return (
            <div className="stat-unit">
                <span className={`player-stat ${this.props.text}`}>{this.props.amount}</span>
                <span className="stat-desc">{this.props.text}</span>
            </div>
        )
    }
}

export default PlayerStat;