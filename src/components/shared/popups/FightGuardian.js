import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import '../../../style/popups.css';
import PlayerDie from './PlayerDie';

@inject("gameStore", "generalStore")

@observer
class FightGuardian extends Component {

    componentDidUpdate() {
        this.props.gameStore.calculatedBoth()
    }

    componentDidMount() {
        this.props.gameStore.getUpdatesFightStore()
    }

    msgToOtherPlayers = () => {
        return (
            <div>
                {this.props.gameStore.fightStore.player} is fighting the guardian!
            </div>
        )
    }
    renderPlayerStats = () => {
        let player_stats = this.props.gameStore.fightStore.playerStats

        return (
            <div className="player-stats">
                <div>{this.props.gameStore.fightStore.player}</div>
                <div>stgh : {player_stats.strength}</div>
            </div>
        )
    }
    isCurrentPlayer = () => {
        return this.props.gameStore.player.name === this.props.gameStore.fightStore.player ? true : false
    }
    renderVS = () => {
        return (
            <div className="vs">
                {this.props.gameStore.fightStore.isToRenderRESULTS ? this.renderResults() : <div>waiting for player to roll...</div>}
            </div>
        )
    }

    renderResults = () => this.props.gameStore.fightStore.isTie ? this.renderTie() : this.renderWinnerLoser()

    renderTie = () => {
        return (<div>
            its a tie...
        </div>)
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

    endFight = () => {
        const winner = this.props.gameStore.fightStore.winner
        const loser = this.props.gameStore.fightStore.loser
        this.props.gameStore.calculateWinnerLosePlayerVsEnemy(winner,loser)
        // this.props.gameStore.getTranslateLifeFromPlayerToPlayer(winner, loser)
        this.props.gameStore.resetFightStats()
    }
    
    renderWinnerLoser = () => {

        return (
            <div className="results">
                <div>{this.props.gameStore.fightStore.player}'s overall is {this.calculateOveralPlayer()}</div>
                <div>{this.props.gameStore.fightStore.opponent} 's overall is {this.calculateOveralOpponent()}</div>

                <div className="winner">
                    The winner is : {this.props.gameStore.fightStore.winner}
                    <button onClick={this.endFight}>End fight</button>
                </div>
            </div>
        )
    }

    renderEnemyStats = () => {
        return (
            <div className="battle-player2-menu">
                <div className="player-combat-stats" >
                    {this.renderOpponentStats()}
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
            </div>
        )
    }
    renderPlayerMenu = () => {

        return (
            <div className="battle-player1-menu">
                < div className="player-combat-stats" >
                    {this.renderPlayerStats()}
                    {this.isCurrentPlayer() ? <PlayerDie /> : null}
                </div >
            </div >
        )
    }


    renderFightMSG = () => <div> {this.props.gameStore.fightStore.player} is fighting {this.props.gameStore.fightStore.opponent} </div>
    render() {
        return (

            this.props.gameStore.player.name === this.props.gameStore.fightStore.player ?
                <div className="start-battle">
                    {/* {this.renderPlayerMenu()}
                    {this.renderVS()}
                    {this.renderEnemyStats()} */}
                    i'm fighting the guardian lol
                </div >
                :
                this.msgToOtherPlayers()
        )
    }
}

export default FightGuardian;