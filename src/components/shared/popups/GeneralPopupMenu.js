import React, { Component } from 'react';
import CombatPopup from './CombatPopup';
import { observer, inject } from 'mobx-react'

@inject("gameStore")

@observer
class GeneralPopupMenu extends Component {
    drawCard = () => {
        console.log("drawing card...")
    }
    buyStuff = () => {
        console.log("buying stuff...")
    }
    renderfieldOptions = () =>
        this.props.gameStore.getTileType() === "Fields" ? <button onClick={this.drawCard}>Draw Card2</button> : null

    renderVillageOptions = () =>
        this.props.gameStore.getTileType() === "Village" ? <button onClick={this.buyStuff}>Buy Stuff2</button> : null

    render() {
        return (
            <div className="general-popup-container">
                {
                    this.props.gameStore.game.isBattleOn ?
                    <CombatPopup />
                    :
                    <div>
                        {this.renderfieldOptions()}
                        {this.renderVillageOptions()}
                    </div>
                }
            </div>
        )
    }
}

export default GeneralPopupMenu;