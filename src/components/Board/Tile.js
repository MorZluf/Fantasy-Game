import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import '../../style/tile.css'

@inject("gameStore")
@observer

class Tile extends Component {

    movePlayer = () => this.props.gameStore.movePlayer(this.props.coords)

    renderClassNameByPlayer = () => {
        let className = ""
        let tile = this.props.tileData
        if (tile.players.length > 0)
            tile.players.map(p => {
                if (p === "Player_1")
                    className = "player1_icon"
                else
                    className = "player2_icon"
            })

        return className
    }
    render() {
        let tile = this.props.tileData
        return (<div onClick={this.movePlayer}
            className={tile.canMoveHere ? `valid-move ${tile.type} tile` : `${tile.type} tile`}>
            {tile.type}
            {/* The below one is without img. */}
            {/* {tile.players.length > 0 ? <div>{tile.players.map(p => p)}</div> : null}  */}

            {/* The below oone is with img */}
            {tile.players.length > 0 ? <div className={this.renderClassNameByPlayer()}></div> : null}
        </div>)
    }
}

export default Tile