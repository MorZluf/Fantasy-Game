import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import '../../../style/popups.css';
import PlayerDie from './PlayerDie';
import OpponentDie from './OpponentDie';

@inject("gameStore", "generalStore")

@observer
class BattleStartPopup extends Component {

    componentDidUpdate() {
        this.props.gameStore.calculatedBoth()
    }

    componentDidMount() {
        this.props.gameStore.getUpdatesFightStore()
    }

    renderResults = () => {
        let result = ""
        if (this.bothRolled()) {
            this.props.gameStore.fightStore.isTie
                ?
                result = this.renderTie()
                :
                result = this.renderWinnerLoser()
        }
        return result
    }

    bothRolled = () => {
        return (this.props.gameStore.fightStore.winner && this.props.gameStore.fightStore.loser)
    }

    renderPlayerMenu() {
        let player = this.props.gameStore.fightStore.player

        return (
            <div className="battle-player1-menu">
                < div className="player-combat-stats" >
                    {this.renderPlayerStats()}
                    {this.isCurrentPlayer() ? <PlayerDie /> : null}
                </div >
            </div >
        )
    }

    renderTie = () => {
        return (<div>
            its a tie...
            <div>
                <button onClick={this.endFight}>End fight</button>
            </div>
        </div>)
    }

    renderWinnerLoser = () => {

        // if (this.props.gameStore.fightStore.winner === this.props.gameStore.player.name)

        return (
            <div className="results">
                <div>{this.props.gameStore.fightStore.player}'s overall is {this.calculateOveralPlayer()}</div>
                <div>{this.props.gameStore.fightStore.opponent} 's overall is {this.calculateOveralOpponent()}</div>

                <div className="winner">
                    The winner is : {this.props.gameStore.fightStore.winner}
                    {this.checkIfCurrentPlayerIsAWinner() ? this.renderWinnerAndLoserOptions() : null}

                </div>
            </div>
        )
    }


    calculateOveralPlayer = () => {
        let result = this.props.gameStore.fightStore.playerRoll + this.props.gameStore.fightStore.playerStats.strength
        return result
    }

    calculateOveralOpponent = () => {
        let result = this.props.gameStore.fightStore.opponentRoll + this.props.gameStore.fightStore.opponentStats.strength
        return result
    }

    checkIfCurrentPlayerIsAWinner = () => {
        return (this.props.gameStore.fightStore.winner === this.props.gameStore.player.name) ? true : false

    }

    renderWinnerAndLoserOptions = () => {
        return (
            <div>
                <button onClick={this.endFight}>End fight</button>
            </div>
        )
    }
    endFight = () => {
        const winner = this.props.gameStore.fightStore.winner
        const loser = this.props.gameStore.fightStore.loser
        this.props.gameStore.getTranslateLifeFromPlayerToPlayer(winner, loser)
        this.props.gameStore.resetFightStats()
    }

    isCurrentPlayer = () => {
        return this.props.gameStore.player.name === this.props.gameStore.fightStore.player ? true : false
    }

    isCurrentOpponent = () => {
        return this.props.gameStore.player.name === this.props.gameStore.fightStore.opponent ? true : false
    }

    renderOpponentMenu() {

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
                <div>{this.props.gameStore.fightStore.opponent}</div>
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
                <div>{this.props.gameStore.fightStore.player}</div>
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
                {this.props.gameStore.fightStore.isToRenderRESULTS ? this.renderResults() : <div>waiting for both fighters..</div>}

            </div>
        )
    }
    getRandom = () => Math.floor(Math.random() * Math.floor(6) + 1)

    renderEnemy = () => {
        let opponent = this.props.gameStore.fightStore.opponent

        return (
            <div className="battle-player2-menu">
                <div className="player-combat-stats" >
                    {this.renderOpponentStats()}
                </div >
            </div >
        )
    }

    rollDie = () => this.props.gameStore.assignRolledNumberToPlayer(this.getRandom())

    render() {
        return (
            <div className="start-battle">
                {this.renderPlayerMenu()}
                {this.renderVS()}
                {this.renderOpponentMenu()}
            </div >
        )
    }
}


export default BattleStartPopup;