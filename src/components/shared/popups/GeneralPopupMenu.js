import React, { Component } from 'react';
import CombatPopup from './CombatPopup';
import { observer, inject } from 'mobx-react'

@inject( "gameStore")

@observer
class GeneralPopupMenu extends Component {
    drawCard = () => {

        let tileTypeFromStore = this.props.gameStore.getTileType()
        console.log(tileTypeFromStore)
        console.log("drawing card...")
    }
    buyStuff = () => {
        console.log("buying gold...")
    }
    
    render() {
        return (
            <div className="general-popup-container">
                {this.props.gameStore.game.isBattleOn ? null : <CombatPopup />}
                <button onClick={this.drawCard}>Draw Card</button>
                <button onClick={this.buyStuff}>Buy Stuff</button>
            </div>
        )
    }
}

export default GeneralPopupMenu;