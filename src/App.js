import React, { Component } from 'react'
import './App.css';
import Test from './components/Test'
import { observer } from 'mobx-react'
import Board from './components/Board/Board';
import Player from './components/Player/Player';
import BoardControls from './components/Board/BoardControls';
import GreetingsMenu from './components/shared/GreetingsMenu';

@observer
class App extends Component {

  render() {
    return (
      <div className="App">
        <Test />
        <hr></hr>
        <GreetingsMenu />
        <hr></hr>
        <div className="GameScreen">
        <Player player="player1"/> 
        <Player player="player1"/> 
        <BoardControls />
        <Board /> 
        </div>
      </div>
    )
  }
}

export default App
