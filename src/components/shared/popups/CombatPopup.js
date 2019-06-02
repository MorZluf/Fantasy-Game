import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import MsgComponent from '../MsgComponent';

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

    renderFightScreen = () => {
        let curPlayer = this.props.gameStore.currentPlayer
        let opponent = this.props.generalStore.chosenPlayer
        this.props.gameStore.initFightPlayers(curPlayer, opponent)
        // this.props.gameStore.renderFightScreen("start_battle")  // vova ToDo : check if needed.. cuz i do it in renderChosePlayerToFight
    }


    componentDidMount() {

    }

    fight = () => {
        let chosenPlayer = this.props.generalStore.chosenPlayer
        this.props.gameStore.fight(chosenPlayer, this.props.gameStore.currentPlayer.name)
        this.props.gameStore.initializeFightStats()
    }
    canChoose = () => this.props.gameStore.currentPlayer.name === this.props.gameStore.player.name ? true : false

    checkIfCurrentPlayerChosing = () => this.props.gameStore.currentPlayer.name === this.props.gameStore.player.name ? true : false

    otherPlayersChoosingMSG = () => `${this.props.gameStore.currentPlayer.name} currently choosing who to fight against...`
    

    renderPlayerIsChoosing = () => {
        return (
            <div>
                <input list="player-list" name="player" onChange={this.props.generalStore.handleChosePlayer} placeholder="Select player to battle" />
                {this.getListOfPlayers()}
                <button onClick={this.renderFightScreen}>FIGHT!</button>
            </div>
        )
    }

    renderMsgToOthers = () =>  <div><MsgComponent msg={this.otherPlayersChoosingMSG()} /></div>
        
    
    render() {

        return (

            <div className="combat-popup" >
                {
                    this.checkIfCurrentPlayerChosing()
                    ?
                    this.renderPlayerIsChoosing()
                    :
                    this.renderMsgToOthers()
                }
            </div>
        )
    }
}

export default CombatPopup;