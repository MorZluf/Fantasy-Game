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
            followerPopUp: false
        }
    }

    showClassPopUp = () => this.setState({ classPopUp: true })

    showinventoryPopUp = () => this.setState({ inventoryPopUp: true })

    showfollowerPopUp = () => this.setState({ followerPopUp: true })

    closeClassPopUp = () => this.setState({ classPopUp: false })

    closeinventoryPopUp = () => this.setState({ inventoryPopUp: false })

    closefollowerPopUp = () => this.setState({ followerPopUp: false })

    render() {
        const player = this.props.player
        return (
            <div className="player-controls">
                <div className="player-details">
                    <h5 onClick={this.showClassPopUp}>{player.class}</h5>
                    <h5 onClick={this.showInventoryPopUp}>Inventory</h5>
                    <h5 onClick={this.showFollowersPopUp}>Followers</h5>
                    {this.state.classPopUp ? <ClassPopUp close={this.closeClassPopUp} charClass={player.class}/> : null}
                    {this.state.inventoryPopUp ? <InventoryPopUp  close={this.closeinventoryPopUp} inventory={player.inventory}/> : null}
                    {this.state.followerPopUp ? <FollowerPopUp close={this.closefollowerPopUp} followers={player.followers}/> : null}
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