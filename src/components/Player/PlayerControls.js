import React, { Component } from 'react';
import PlayerStat from './PlayerStat'
import ClassPopUp from './ClassPopUp';
import InventoryPopUp from './InventoryPopUp';
import FollowerPopUp from './FollowerPopUp';

class PlayerControls extends Component {
    constructor() {
        super()
        this.state = {
            classPopUp: false,
            inventoryPopUp: false,
            followersPopUp: false
        }
    }

    showClassPopUp = () => this.setState({ classPopUp: true })

    showInventoryPopUp = () => this.setState({ inventoryPopUp: true })

    showFollowersPopUp = () => this.setState({ followersPopUp: true })

    closeClassPopUp = () => this.setState({ classPopUp: false })

    closeInventoryPopUp = () => this.setState({ inventoryPopUp: false })

    closeFollowersPopUp = () => this.setState({ followersPopUp: false })

    render() {
        const player = this.props.player
        return (
            <div className="player-controls">
                <div className="player-details">
                    <h5 onClick={this.showClassPopUp}>{player.class}</h5>
                    <h5 onClick={this.showInventoryPopUp}>Inventory</h5>
                    <h5 onClick={this.showFollowersPopUp}>Followers</h5>
                    {this.state.classPopUp ? <ClassPopUp close={this.closeClassPopUp} charClass={player.class}/> : null}
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