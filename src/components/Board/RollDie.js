import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer
class RollDie extends Component {

    rollDie = () => this.props.gameStore.rollDie()

    render(){
        return (<div>
            <div onClick={this.rollDie} className="die-image">{this.props.gameStore.game.movementDie}</div>
            {this.props.gameStore.playerIsCurrent() ? <div>Roll the die, {this.props.gameStore.player.name}</div> : null}
        </div>)
    }
}

export default RollDie