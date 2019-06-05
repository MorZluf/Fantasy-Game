import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
@inject("gameStore", "generalStore")

@observer
class PlayerDie extends Component {

    rollDie = () => this.props.gameStore.assignRolledNumberToPlayer(this.getRandom())

    rollDieForEnemyToo = () => this.props.gameStore.assignRolledNumberToPlayerAndEnemy(this.getRandom(), this.getRandom())

    getRandom = () => Math.floor(Math.random() * Math.floor(6) + 1)

    didPress = () => this.props.gameStore.fightStore.playerSubmit

    renderButtonAccordingToTypeOfBattle = () => {
        let button = <button onClick={this.rollDie} style={{ visibility: this.didPress() ? "hidden" : "visible" }}>Roll</button>
        if ( this.props.gameStore.fightStore.opponentType === "enemy" ||  this.props.gameStore.fightStore.opponentType === "guardian")
            button = <button onClick={this.rollDieForEnemyToo} style={{ visibility: this.didPress() ? "hidden" : "visible" }}>Roll</button>
        return button
    }
    render() {
        return (
            <div>
                <div className="die-image">{this.props.gameStore.fightStore.playerRoll}</div>
                {/* before adding guardian.. */}
                {/* {this.props.gameStore.fightStore.opponentType === "enemy" ?
                    <button onClick={this.rollDieForEnemyToo} style={{ visibility: this.didPress() ? "hidden" : "visible" }}>Roll</button>
                    :
                    <button onClick={this.rollDie} style={{ visibility: this.didPress() ? "hidden" : "visible" }}>Roll</button>
                } */}
                {/* after adding guardian... */}
                {this.renderButtonAccordingToTypeOfBattle()}
            </div>
        )
    }
}

export default PlayerDie;