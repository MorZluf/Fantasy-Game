import React, { Component } from 'react'
import Board from './Board'
import Player from '../Player/Player'
import BoardControls from './BoardControls'
import GeneralPopupMenu from '.././shared/popups/GeneralPopupMenu'
// import '../App.css'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer
class MainGame extends Component {

    render() {
        return (
            <div>
                <GeneralPopupMenu />

                <div className="game-screen">
                    <div className="main-controls">
                        <Player client={"Player_1"} player={this.props.gameStore.game.players["Player_1"]} />
                        <div></div>
                        <Player client={"Player_2"} player={this.props.gameStore.game.players["Player_2"]} />
                    </div>
                    <Board />
                    <BoardControls />
                </div>
            </div>
        )
    }
}

export default MainGame