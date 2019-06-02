import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AdventureCard from './../AdventureCard';

@inject("gameStore")
@observer
class FieldPopup extends Component {

    drawCard = () => this.props.gameStore.drawAdventureCard()

    discardCard = () => this.props.gameStore.closePopup()

    toCombat = () => {
        // this.props.gameStore.closePopup()
        this.props.gameStore.game.popupType = "start_battle"
    }

    takeCard = () => {
        console.log(`adding ${this.props.gameStore.drawnCard.title} to ${this.props.gameStore.currentPlayer.name}`)
        this.props.gameStore.closePopup()
    }
    
    componentDidMount = () => {
        this.props.gameStore.setDrawnAdventureCard()
        // this.props.gameStore.setEndCardDraw()
    }

    render() {
        return (
            <div className="field-popup">
                <h4>Field-Popup</h4>
                {this.props.gameStore.clientState.cardDrawn ? 
                    <div>
                        <AdventureCard details={this.props.gameStore.drawnCard} />
                        <React.Fragment>{this.props.gameStore.isPlayerCurrent() ? 
                            <React.Fragment>{this.props.gameStore.drawnCard.type === "enemy" ?
                                <button onClick={this.toCombat}>Fight</button> :
                                <div><button onClick={this.takeCard}>Take</button><button onClick={this.discardCard}>Discard</button></div>}
                            </React.Fragment> :
                            null}
                        </React.Fragment>
                    </div> :
                    <React.Fragment>{this.props.gameStore.isPlayerCurrent() ? 
                        <button onClick={this.drawCard}>Draw Card</button> : 
                        null }
                    </React.Fragment>}
            </div>
        )
    }
}

export default FieldPopup