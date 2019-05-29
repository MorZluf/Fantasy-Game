import React, { Component } from 'react';

class PlayerStat extends Component {

    render() {
        return (
            <div >
                <div className={`player-stat ${this.props.text}`}>{this.props.amount}</div>
                <div className="stat-desc">{this.props.text}</div>
            </div>
        )
    }
}

export default PlayerStat;