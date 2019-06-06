import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
@inject("gameStore", "generalStore")

@observer
class OpponentDie extends Component {

    rollDie = () => this.props.gameStore.assignRolledNumberToOpponent(this.getRandom())
    
    getRandom = () => Math.floor(Math.random() * Math.floor(6) + 1)
    
    didPress = () => this.props.gameStore.fightStore.opponentSubmit

    assignDieFace = () => {
        let dieResult = this.props.gameStore.fightStore.opponentRoll

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
                <button onClick={this.rollDie} style={{visibility: this.didPress() ? "hidden" : "visible" }} >Roll</button>
                {/* <button onClick={this.submit} >Submit</button> */}
            </div>
        )
    }
}

export default OpponentDie;