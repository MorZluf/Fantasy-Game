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

    assignDieFace = () => {
        let dieResult = this.props.gameStore.fightStore.playerRoll

        if (dieResult === 1) { return <i className="fas fa-dice-one"></i> }
        else if (dieResult === 2) { return <i class="fas fa-dice-two"></i> }
        else if (dieResult === 3) { return <i class="fas fa-dice-three"></i> }
        else if (dieResult === 4) { return <i class="fas fa-dice-four"></i> }
        else if (dieResult === 5) { return <i class="fas fa-dice-five"></i> }
        else { return <i class="fas fa-dice-six"></i> }
    }

    render() {
        return (
            <div>
                <div className="die-image">{this.assignDieFace()}</div>
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