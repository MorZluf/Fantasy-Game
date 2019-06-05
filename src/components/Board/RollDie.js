import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer
class RollDie extends Component {

    rollDie = () => {
        console.log("here")
        this.props.gameStore.rollDie()
    }

    allowRoll = () => this.props.gameStore.clientState.isCurrentPlayer && !this.props.gameStore.clientState.movementRollMade

    render(){
        return (<div className="die">
            <div className="die-image">{this.props.gameStore.game.movementDie}</div>
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