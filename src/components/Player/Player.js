import React, { Component } from 'react';
import PlayerControls from './PlayerControls'
import '../../style/playerboard.css'
import { observer, inject } from 'mobx-react'
import ClassPopUp from '../shared/popups/ClassPopup';
import InventoryPopUp from './InventoryPopUp';
import FollowerPopUp from './FollowerPopUp';

@inject("gameStore")
@observer

class Player extends Component {
    constructor() {
        super()
        this.state = {
            classPopUp: false,
            inventoryPopUp: false,
            followersPopUp: false
        }
    }

    toggleClassPopUp = () => this.setState({ classPopUp: !this.state.classPopUp })

    toggleInventoryPopUp = () => this.setState({ inventoryPopUp: !this.state.inventoryPopUp })

    toggleFollowersPopUp = () => this.setState({ followersPopUp: !this.state.followersPopUp })

    getClass = () => this.props.gameStore.getClassDetails(this.props.player.class)

    checkCurrentPlayer = () => this.props.client === this.props.gameStore.currentPlayer.name

    endTurn = () => this.props.gameStore.endTurn()

    canEndTurn = () => this.checkCurrentPlayer() && 
        this.props.gameStore.clientState.isCurrentPlayer &&
        this.props.gameStore.clientState.movementMade

    render() {
        const player = this.props.player
        return (
             <div className={this.checkCurrentPlayer() ? "current-player player-board" : "player-board"}>
                <div className="player-board-name">{player.name} ({this.props.client})</div>
                <PlayerControls player={player}/>
                
                <div className="player-details">
                        <h5 onClick={this.toggleClassPopUp}>{player.class}</h5>
                        <h5 onClick={this.toggleInventoryPopUp}>Inventory</h5>
                        <h5 onClick={this.toggleFollowersPopUp}>Followers</h5>
                        {this.state.classPopUp ? <ClassPopUp close={this.closeClassPopUp} charClass={this.getClass()}/> : null}
                        {this.state.inventoryPopUp ? <InventoryPopUp close={this.closeInventoryPopUp} inventory={player.inventory}/> : null}
                        {this.state.followersPopUp ? <FollowerPopUp close={this.closeFollowersPopUp} followers={player.followers}/> : null}
                </div>
                <button onClick={this.endTurn} style={{visibility: this.canEndTurn() ? "visible" : "hidden"}}>End turn</button>
             </div>
        )
    }
}

export default Player;