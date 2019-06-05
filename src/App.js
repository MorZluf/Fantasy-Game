import React, { Component } from 'react'
import './App.css';
import { observer, inject } from 'mobx-react'
import GreetingsMenu from './components/shared/GreetingsMenu';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MainGame from './components/Board/MainGame'
import Instructions from './components/shared/popups/Instructions';


@inject("gameStore")
@observer
class App extends Component {

  componentDidMount() {
    this.props.gameStore.getGameState()
    this.props.gameStore.getCurrentTurn()
    this.props.gameStore.resetFightStore()
  }

  render() {
    return (
      
      <Router>
        <div>
          {this.props.gameStore.loading ? <div>loading</div> : <div className="App">
            
          <Route path="/" exact component={GreetingsMenu}/>
          
          <Route path="/board" exact component={MainGame}/>

          <Route path="/instructions" exact component={Instructions}/>
            

          </div>}
          <div className="background"></div>
        </div>
      </Router>
    )
  }
}

export default App
