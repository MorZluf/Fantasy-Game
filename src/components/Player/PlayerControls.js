import React, { Component } from 'react';
import PlayerStat from './PlayerStat'
import ClassPopUp from '../shared/popups/ClassPopup';
import InventoryPopUp from './InventoryPopUp';
import FollowerPopUp from './FollowerPopUp';
import { observer, inject } from 'mobx-react';

@inject("gameStore")
@observer
class PlayerControls extends Component {
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

    render() {
        const player = this.props.player
        return (
            <div className="player-controls">
                <div className="player-details">
                    <h5 onClick={this.toggleClassPopUp}>{player.class}</h5>
                    <h5 onClick={this.toggleInventoryPopUp}>Inventory</h5>
                    <h5 onClick={this.toggleFollowersPopUp}>Followers</h5>
                    {this.state.classPopUp ? <ClassPopUp close={this.closeClassPopUp} charClass={this.getClass()}/> : null}
                    {this.state.inventoryPopUp ? <InventoryPopUp close={this.closeInventoryPopUp} inventory={player.inventory}/> : null}
                    {this.state.followersPopUp ? <FollowerPopUp close={this.closeFollowersPopUp} followers={player.followers}/> : null}
                </div>
                <PlayerStat text="Str" amount={player.stats.strength}/>
                <PlayerStat text="Cft" amount={player.stats.craft}/>
                <PlayerStat text="Lfe" amount={player.stats.life}/>
                <PlayerStat text="Gld" amount={player.stats.gold}/>
            </div>
        )
    }
}

export default PlayerControls;