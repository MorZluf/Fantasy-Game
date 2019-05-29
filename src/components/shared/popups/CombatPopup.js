import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

@inject( "gameStore", "generalStore")

@observer
class CombatPopup extends Component {
    getListOfPlayers = () => {
        
        // let arrOptions = this.getListOfDummyListOfPlayers()  // dummy data
        let arrOptions = this.getListPlayersToBattle()         // list of players except myself
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

    fight = () => {
        let chosenPlayer = this.props.generalStore.chosenPlayer
        this.props.gameStore.fight(chosenPlayer, this.props.gameStore.currentPlayer.name)
    }
    render() {
        return (
            <div className="combat-popup">
                <h4>I'm a combat popup!</h4>
                <div>{this.props.gameStore.game.arrPlayersOnTile[0]}</div>
                <span> VS </span>
                <div>{this.props.gameStore.game.arrPlayersOnTile[1]}</div>
                <input list="player-list" name="player" onChange={this.props.generalStore.handleChosePlayer} placeholder="Select player to battle" />
                {this.getListOfPlayers()}
                <button onClick={this.fight}>FIGHT!</button>

            </div>
        )
    }
}

export default CombatPopup;