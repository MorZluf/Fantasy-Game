import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
@inject("gameStore", "generalStore")

@observer
class CombatDie_Player1 extends Component {
    rollDie = () => {
        let  randomNum = Math.floor(Math.random() * Math.floor(6) + 1)
        this.props.gameStore.assingToPlayer1(randomNum, this.props.player)
    }
    submit = () => this.props.gameStore.submitPlayer(this.props.player)
    render() {
        return (
             <div>
                 <div className="die-image">{this.props.gameStore.fightStats.rolledDie1}</div>
                 <button onClick={this.rollDie}>Roll</button>
                 <button onClick={this.submit}>Submit</button>
             </div>
        )
    }
}

export default CombatDie_Player1;