import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import VillageChooseItem from './VillageChooseItem';
import '../../../style/card.css'


@inject("gameStore")
@observer
class VillagePopup extends Component {

    openVillageInventory = () => {
            this.props.gameStore.isShowVillagePopup = true
        }

    leaveVillage = () => {
        this.props.gameStore.isShowVillagePopup = false
        this.props.gameStore.closePopup()
    }
    
    render() {
        return (
            <div className="village-popup">
                <h4>Village-Popup</h4>
                <button onClick={this.openVillageInventory}>Buy Stuff</button>
                <button onClick={this.leaveVillage}>Leave Village</button>
                <div className="village-purchase">
                    {this.props.gameStore.isShowVillagePopup ? 
                    this.props.gameStore.game.villageInventory.map((item, i) => <VillageChooseItem key={i} item={item}/>) : 
                    null }
                </div>
            </div>
        )
    }
}

export default VillagePopup;