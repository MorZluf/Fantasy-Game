import React, { Component } from 'react';
import '../../../style/popups.css'
import { observer, inject } from 'mobx-react'
@inject("gameStore", "generalStore")

@observer
class EndGame extends Component {

    render() {
        return (
            <div className="end-game">
                <h1>The Winner is: {this.props.gameStore.game.gameWinner.name} </h1>
            </div>
            )
        }
    }
    
    export default EndGame