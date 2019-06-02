import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import CombatDie_Player1 from '../popups/CombatDie_Player1';
import CombatDie_Player2 from '../popups/CombatDie_Player2';

import '../../../style/popups.css';
@inject("gameStore", "generalStore")

@observer
class BattleStartPopup extends Component {

    renderPlayer1Menu() {
        let currentPlayer = this.props.gameStore.currentPlayer.name
        
        return (
            <div className="battle-player1-menu">
                < div className="player-combat-stats" >
                    {this.renderPlayerStats(currentPlayer)}
                    <CombatDie_Player1 player={currentPlayer}/>
                </div >
            </div >
        )
    }

    renderPlayer2Menu() {
        let chosenPlayer = this.props.generalStore.chosenPlayer

        return (
            <div className="battle-player2-menu">
                <div className="player-combat-stats" >
                    {this.renderPlayerStats(chosenPlayer)}
                    <CombatDie_Player2 player={chosenPlayer}/>
                </div >
            </div >
        )
    }

    renderPlayerStats = player => {
        let player_stats = this.props.gameStore.getPlayerStatsByPlayer(player)

        return (
            <div className="player-stats">
            <h6>(stats are hardcoded...)</h6>
                <div>stgh : {player_stats.strength}</div>
                <div>crft : {player_stats.craft}</div>
                <div>life : {player_stats.life}</div>
                <div>gold : {player_stats.gold}</div>
            </div>
        )
    }
    renderVS = () => {
        return (
            <div className="vs">
                <span>-VS-</span>
            </div>
        )
    }
    render() {
        return (
            <div className="start-battle">
                {/* {this.renderPlayer1Menu()}
                {this.renderVS()}
                {this.renderPlayer2Menu()} */}
                {console.log(this.props.gameStore.fightStore)}
            </div >
        )
    }
}

export default BattleStartPopup;