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
        this.props.gameStore.clientState.purchaseAlerts = []
    }

    componentDidMount() {
        this.props.gameStore.alertCardGain()
    }
    
    render() {
        return (
            <div className="village-popup">
                <h4>Village-Popup</h4>
                <React.Fragment>{this.props.gameStore.clientState.isCurrentPlayer ?
                    <React.Fragment>
                        <button onClick={this.openVillageInventory}>Buy Stuff</button>
                        <button onClick={this.leaveVillage}>Leave Village</button>
                    </React.Fragment> : null}
                </React.Fragment>
                <div className="village-purchase">
                    {this.props.gameStore.isShowVillagePopup ? 
                    this.props.gameStore.game.villageInventory.map((item, i) => <VillageChooseItem key={i} item={item}/>) : 
                    null }
                </div>
                <div className="purchase-alert">
                    {this.props.gameStore.clientState.purchaseAlerts.length > 0 ? 
                    this.props.gameStore.clientState.purchaseAlerts.map((item, i) => <div key={i}>
                    {this.props.gameStore.currentPlayer.name} has purchased: {item.title}</div> ): 
                    null }
                </div>
            </div>
        )
    }
}

export default VillagePopup;