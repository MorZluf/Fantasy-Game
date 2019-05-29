import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

@inject( "gameStore")

@observer
class CombatPopup extends Component {
    getListOfPlayers = () => {
        
        let arrOptions = this.getListOfDummyListOfPlayers()  // dummy data
        // let arrOptions = this.getListPlayersToBattle()         // list of players except myself
        return (
            <datalist id="player-list">
                {arrOptions}
            </datalist>
        )
    }
    getListPlayersToBattle = () => {
        let arrPlayersOnCurrentTile = this.props.gameStore.game.arrPlayersOnTile
        let result = []

        for (let i = 0; i < arrPlayersOnCurrentTile.length; i++) {
            if ( arrPlayersOnCurrentTile[i] === this.props.gameStore.currentPlayer.name) continue

            let curOption = <option key={arrPlayersOnCurrentTile[i]} value={arrPlayersOnCurrentTile[i]}></option>
            result.push(curOption)
        }
        return result
    }

    getListOfDummyListOfPlayers = () => {
        let result = []
        let arrPlayers = ["p1", "p2", "p3"]
        for (let i = 0; i < arrPlayers.length; i++) {
            let curOption = <option key={arrPlayers[i]} value={arrPlayers[i]}></option>
            result.push(curOption)
        }
        return result
    }

    render() {
        return (
            <div className="combat-popup">
                <h4>I'm a combat popup!</h4>
                <div>{this.props.gameStore.game.arrPlayersOnTile[0]}</div>
                <span> VS </span>
                <div>{this.props.gameStore.game.arrPlayersOnTile[1]}</div>
                <input list="player-list" name="player" placeholder="Select player to battle" />
                {this.getListOfPlayers()}
            </div>
        )
    }
}

export default CombatPopup;