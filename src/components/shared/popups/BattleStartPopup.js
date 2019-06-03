import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import '../../../style/popups.css';
import PlayerDie from './PlayerDie';
import OpponentDie from './OpponentDie';

@inject("gameStore", "generalStore")

@observer
class BattleStartPopup extends Component {

    componentDidMount() {
        // this.props.gameStore.renderPopup()
    }
    renderPlayerMenu() {
        let player = this.props.gameStore.fightStore.player

        return (
            <div className="battle-player1-menu">
                < div className="player-combat-stats" >
                    {this.renderPlayerStats()}
                    {this.isCurrentPlayer() ? <PlayerDie /> : null }
                </div >
            </div >
        )
    }
    isCurrentPlayer = () => {
        return this.props.gameStore.player.name === this.props.gameStore.fightStore.player ? true : false
    }

    isCurrentOpponent = () => {
        return this.props.gameStore.player.name === this.props.gameStore.fightStore.opponent ? true : false
    }

    renderOpponentMenu() {
        let opponent = this.props.gameStore.fightStore.opponent

        return (
            <div className="battle-player2-menu">
                <div className="player-combat-stats" >
                    {this.renderOpponentStats()}
                    {this.isCurrentOpponent() ? <OpponentDie /> : null}
                </div >
            </div >
        )
    }

    renderOpponentStats = () => {
        let opponentStats = this.props.gameStore.fightStore.opponentStats

        return (
            <div className="player-stats">
                <div>stgh : {opponentStats.strength}</div>
                <div>crft : {opponentStats.craft}</div>
                <div>life : {opponentStats.life}</div>
                <div>gold : {opponentStats.gold}</div>
            </div>
        )
    }
    renderPlayerStats = () => {
        let player_stats = this.props.gameStore.fightStore.playerStats

        return (
            <div className="player-stats">
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
                {console.log(this.props.gameStore.fightStore)}
                {this.renderPlayerMenu()}
                {this.renderVS()}
                {this.renderOpponentMenu()}
            </div >
        )
    }
}

export default BattleStartPopup;