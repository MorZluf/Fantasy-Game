import React, { Component } from 'react';
import PlayerStat from './PlayerStat'
class PlayerControls extends Component {

    render() {
        const player = this.props.player
        return (
            <div className="player-controls">
                <PlayerStat text="Str" amount={player.stats.strength}/>
                <PlayerStat text="Cft" amount={player.stats.craft}/>
                <PlayerStat text="Lfe" amount={player.stats.life}/>
                <PlayerStat text="Gld" amount={player.stats.gold}/>
            </div>
        )
    }
}

export default PlayerControls;