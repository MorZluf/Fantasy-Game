import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer
class RollDie extends Component {

    rollDie = () => this.props.gameStore.rollDie()

    render(){
        return (<div onClick={this.rollDie}>
            {this.props.gameStore.game.movementDie}
        </div>)
    }
}

export default RollDie