import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AdventureCard from './../AdventureCard';

@inject("gameStore")
@observer
class GuardianPopup extends Component {

    drawCard = () => this.props.gameStore.drawAdventureCard()

    discardCard = () => this.props.gameStore.closePopup()

    toCombat = () => {
        this.props.gameStore.initPlayerGuardianFight()
    }

    takeCard = () => {
        this.props.gameStore.addCardToPlayer(this.props.gameStore.currentPlayer.name, this.props.gameStore.drawnCard)
        this.props.gameStore.closePopup()
    }
    
    componentDidMount = () => {
        this.props.gameStore.setDrawnAdventureCard()
        // this.props.gameStore.setEndCardDraw()
    }

    render() {
        return (
            <div className="guardian-popup">
                <h4>The Guardian!</h4>
                <button onClick={this.toCombat}>Fight him</button> 
            </div>
        )
    }
}

export default GuardianPopup