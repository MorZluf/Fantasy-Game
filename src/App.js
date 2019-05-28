import React, { Component } from 'react'
import './App.css';
import Test from './components/Test'
import { observer } from 'mobx-react'
import Board from './components/Board/Board';
import Player from './components/Player/Player';
import BoardControls from './components/Board/BoardControls';
import GreetingsMenu from './components/shared/GreetingsMenu';
import PopupContainer from './components/shared/popups/PopupContainer';

@observer
class App extends Component {
  arrDummyPopupsTypes = ["combat-popup", "menu-popup"] // dummy data to render different types of popups

  render() {
    return (
      <div className="App">
        <Test />
        <hr></hr>
        <GreetingsMenu />
        <hr></hr>
        <div className="GameScreen">
        <Player player="player1"/> 
        <Player player="player2"/> 
        <BoardControls />
        <Board /> 
        <hr></hr>
        <h5>Popup options</h5>
        <PopupContainer popup={this.arrDummyPopupsTypes[0]}/> 
        <PopupContainer popup={this.arrDummyPopupsTypes[1]}/>
        </div>
      </div>
    )
  }
}

export default App
