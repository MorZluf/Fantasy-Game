import React, { Component } from 'react'

class Tile extends Component {
    render(){
        let tile = this.props.tileData
        return (<div>
            {tile.type}
            {tile.players.length > 0 ? <div>{tile.players.map(p => p)}</div> : null}
        </div>)
    }
}

export default Tile