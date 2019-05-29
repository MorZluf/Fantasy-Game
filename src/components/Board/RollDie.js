import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer
class RollDie extends Component {

    rollDie = () => this.props.gameStore.rollDie()

    checkCurrentPlayer = () => this.props.player === this.props.gameStore.currentPlayer.name

    render(){
        return (<div>
            <div className="die-image">{this.props.gameStore.game.movementDie}</div>
            {this.props.gameStore.isCurrentPlayer ? 
                <div>
                    Roll the die, {this.props.gameStore.player.name}
                    <button onClick={this.rollDie}>Roll!</button>
                </div> : 
            null}
        </div>)
    }
}

export default RollDie