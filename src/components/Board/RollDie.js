import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer
class RollDie extends Component {

    rollDie = () => {
        console.log("here")
        this.props.gameStore.rollDie()
    }

    assignDieFace = () => {
        let dieResult = this.props.gameStore.game.movementDie

        if (dieResult === 1) { return <i className="fas fa-dice-one"></i> }
        else if (dieResult === 2) { return <i class="fas fa-dice-two"></i> }
        else if (dieResult === 3) { return <i class="fas fa-dice-three"></i> }
        else if (dieResult === 4) { return <i class="fas fa-dice-four"></i> }
        else if (dieResult === 5) { return <i class="fas fa-dice-five"></i> }
        else { return <i class="fas fa-dice-six"></i> }
    }

    allowRoll = () => this.props.gameStore.clientState.isCurrentPlayer && !this.props.gameStore.clientState.movementRollMade

    render() {
        return (<div className="die">
            <div className="die-image">{this.assignDieFace()}</div>
            {this.allowRoll() ?
                <div className="die-text">
                    <span>Roll the die, {this.props.gameStore.game.players[this.props.gameStore.player.name].name}</span>
                    <button onClick={this.rollDie}>Roll!</button>
                </div> :
                null}
        </div>)
    }
}

export default RollDie