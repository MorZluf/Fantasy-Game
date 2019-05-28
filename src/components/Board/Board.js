import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer
class Board extends Component {

    render() {
        return (<div>
            {this.props.gameStore.game.outerRegionAsArray.map(a => <div>x: {a.x}, y: {a.y}</div>)}
        </div>)
    }
}

export default Board;