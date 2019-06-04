import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Item from './Item';


@inject("gameStore")
@observer
class VillagePopup extends Component {

    openVillageInventory = () => {
            this.props.gameStore.isShowVillagePopup = true
        }
    
    render() {
        return (
            <div className="village-popup">
                <h4>Village-Popup</h4>
                <button onClick={this.openVillageInventory}>Buy Stuff</button>
                <div className="village-purchase">
                    {this.props.gameStore.isShowVillagePopup ? 
                    this.props.gameStore.game.villageInventory.map((item, i) => <Item key={i} item={item}/>) : 
                    null }
                </div>
            </div>
        )
    }
}

export default VillagePopup;