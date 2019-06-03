import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
@inject("gameStore", "generalStore")

@observer
class PlayerDie extends Component {

    rollDie = () => this.props.gameStore.assignRolledNumberToPlayer(this.getRandom())

    getRandom = () => Math.floor(Math.random() * Math.floor(6) + 1)

    didPress = () => this.props.gameStore.fightStore.playerSubmit

    render() {
        return (
            <div>
                <div className="die-image">{this.props.gameStore.fightStore.playerRoll}</div>
                <button onClick={this.rollDie} style={{visibility: this.didPress() ? "hidden" : "visible" }}>Roll</button>
                {/* <button onClick={this.submit} >Submit</button> */}
            </div>
        )
    }
}

export default PlayerDie;