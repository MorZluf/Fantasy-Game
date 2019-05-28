import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject("gameStore", "generalStore")
@observer
class Test extends Component {

    componentDidMount = () => {
        this.props.gameStore.assignPlayer()
        this.props.gameStore.getGameState()
        this.props.gameStore.getCurrentTurn()
    }

    movePlayer = () => this.props.gameStore.movePlayer(this.props.generalStore.input)

    endTurn = () => this.props.gameStore.endTurn()
    
    render(){
        return (<div>
            <div>Player: {this.props.gameStore.player.name}</div>
            <div>Current Turn: {this.props.gameStore.currentPlayer.name}</div>
            <div>{this.props.gameStore.gameState.test}</div>
            <input type="number" value={this.props.generalStore.input} onChange={this.props.generalStore.handleInput}/>
            <button onClick={this.movePlayer}>Move player</button>
            <button onClick={this.endTurn}>End turn</button>
        </div>)
    }
}

export default Test