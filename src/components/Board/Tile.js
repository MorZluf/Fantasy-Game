import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer

class Tile extends Component {

    movePlayer = () => this.props.gameStore.movePlayer(this.props.coords)

    render(){
        let tile = this.props.tileData
        return (<div onClick={this.movePlayer}>
            {tile.type}
            {tile.players.length > 0 ? <div>{tile.players.map(p => p)}</div> : null}
        </div>)
    }
}

export default Tile