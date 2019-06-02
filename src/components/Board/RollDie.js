import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer
class RollDie extends Component {

    rollDie = () => this.props.gameStore.rollDie()

    allowRoll = () => this.props.gameStore.clientState.isCurrentPlayer && !this.props.gameStore.clientState.movementRollMade

    render(){
        return (<div>
            <div className="die-image">{this.props.gameStore.game.movementDie}</div>
            {this.allowRoll() ? 
                <div>
                    Roll the die, {this.props.gameStore.player.name}
                    <button onClick={this.rollDie}>Roll!</button>
                </div> : 
            null}
        </div>)
    }
}

export default RollDie