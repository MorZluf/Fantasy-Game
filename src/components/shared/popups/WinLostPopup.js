import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
@inject("gameStore", "generalStore")

@observer
class WinLostPopup extends Component {
    renderBothStats = () => {
        return (
            <div>
                <div className>
                    showing stats...
                </div>
            </div>
        )

    }
    renderWinner = () => {
        return (
            <div>
                The winner is: {this.calculateWinner()}
            </div>
        )
    }
    calculateWinner = () => {
        let winner = ""
        let sum1 = this.props.gameStore.fightStats.rolledDie1 + this.props.gameStore.fightStats.player1_stats.strength
        let sum2 = this.props.gameStore.fightStats.rolledDie2 + this.props.gameStore.fightStats.player2_stats.strength

        winner = sum1 > sum2 ? this.props.gameStore.fightStats.player1 :  this.props.gameStore.fightStats.player2_stats
        return winner

    }
    render() {
        return (
            <div>
                {this.renderBothStats()}
                {this.renderWinner()}
            </div>
        )
    }
}

export default WinLostPopup;