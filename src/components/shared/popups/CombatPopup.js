import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject("gameStore", "generalStore")

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
            if (arrPlayersOnCurrentTile[i] === this.props.gameStore.currentPlayer.name) continue

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

    initFightStats = () => {
        let curPlayer = this.props.gameStore.currentPlayer.name
        let opponent = this.props.generalStore.chosenPlayer
        this.props.gameStore.initFightPlayers(curPlayer, opponent)
    }

    // vova ToDo : check if needed all this chain reactions
    fight = () => {
        let chosenPlayer = this.props.generalStore.chosenPlayer
        this.props.gameStore.fight(chosenPlayer, this.props.gameStore.currentPlayer.name)
        this.props.gameStore.initializeFightStats()
    }

    checkIfCurrentPlayerChosing = () => this.props.gameStore.currentPlayer.name === this.props.gameStore.player.name ? true : false

    goToTile = () => this.props.gameStore.determineTileActions(this.props.gameStore.clientState.currentTile, true)

    render() {

        return (

            <div className="combat-popup" >

                <h5>{this.props.gameStore.currentPlayer.name} is choosing who to fight!</h5>
                {
                    this.checkIfCurrentPlayerChosing()
                        ?
                        <div>
                            <input list="player-list" name="player" onChange={this.props.generalStore.handleChosePlayer} placeholder="Select player to battle" />
                            {this.getListOfPlayers()}
                            <button onClick={this.initFightStats}>FIGHT!</button>
                            <button onClick={this.goToTile}>Go to {this.props.gameStore.clientState.currentTile.type} instead</button>
                        </div>
                        :
                        null
                }


            </div>
        )
    }
}

export default CombatPopup;