import React, { Component } from 'react'
import './App.css';
import { observer, inject } from 'mobx-react'

@inject("gameStore", "generalStore")
@observer
class App extends Component {

  componentDidMount() {
    this.props.gameStore.getGameState()
    this.props.gameStore.getCurrentTurn()
  }

  movePlayer = () => this.props.gameStore.movePlayer(this.generalStore.input)

  endTurn = () => this.props.gameStore.endTurn()

  render() {
    return (
      <div className="App">
        {this.props.gameStore.gameState.test}
        <input type="number" value={this.generalStore.input} onChange={this.generalStore.handleInput}/>
        <button onClick={movePlayer}>Move player</button>
        <button onClick={endTurn}>End turn</button>
      </div>
    )
  }
}

export default App;
