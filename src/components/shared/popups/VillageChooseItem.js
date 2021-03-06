import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Item from './Item';
import '../../../style/card.css'



@inject("gameStore")
@observer
class VillageChooseItem extends Component {

    purchaseItem = () => {
        if (this.props.gameStore.game.players[this.props.gameStore.currentPlayer.name].stats.gold) {
            this.props.gameStore.addCardToPlayer(this.props.gameStore.currentPlayer.name, this.props.item)
            this.props.gameStore.subtractGold(this.props.gameStore.currentPlayer.name, 1)
        }
    }

    render() {
        return (
            <div className="village-choose-btn-container">
                <Item key={this.props.i} item={this.props.item} />
                <button onClick={this.purchaseItem}>Choose</button>
            </div>
        )
    }
}

export default VillageChooseItem