import React, { Component } from 'react'
import './App.css';
import { observer, inject } from 'mobx-react'
import Board from './components/Board/Board';
import Player from './components/Player/Player';
import BoardControls from './components/Board/BoardControls';
import GreetingsMenu from './components/shared/GreetingsMenu';
import GeneralPopupMenu from './components/shared/popups/GeneralPopupMenu';

@inject("gameStore")
@observer
class App extends Component {

  componentDidMount() {
    this.props.gameStore.getGameState()
    this.props.gameStore.getCurrentTurn()
  }

  render() {
    return (
      <React.Fragment>
        {this.props.gameStore.loading ? <div>loading</div> : <div className="App">
          {/* <Test />
          <hr></hr> */}
          <GreetingsMenu />
          <hr></hr>
          <GeneralPopupMenu />
         
          <hr></hr>
          <div className="game-screen">
            <div className="main-controls">
              <Player player="Player_1"/> 
              <BoardControls />
              <Player player="Player_2"/>
            </div>
            <Board />
          </div>
        </div>}
      
      </React.Fragment>
    )
  }
}

export default App
