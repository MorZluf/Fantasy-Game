import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

@inject( "gameStore")

@observer
class CombatPopup extends Component {

    render() {
        return (
            <div className="combat-popup">
                <h4>I'm a combat popup!</h4>
                <div>{this.props.gameStore.game.arrPlayersOnTile[0]}</div>
                <span> VS </span>
                <div>{this.props.gameStore.game.arrPlayersOnTile[1]}</div>

            </div>
        )
    }
}

export default CombatPopup;