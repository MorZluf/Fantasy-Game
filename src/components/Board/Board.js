import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Tile from './Tile'

import '../../style/board.css'

@inject("gameStore")
@observer
class Board extends Component {

    render() {
        return (<div className="main-board">
            {this.props.gameStore.game.matrix.map((r, i) =>
                 r.map((c, j) =>
                    <Tile key={"c" + i + "-" + j} tileData={c}/>))
            }
        </div>)
    }
}

export default Board;