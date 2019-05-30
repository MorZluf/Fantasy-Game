import React, { Component } from 'react'
import Board from './Board'
import Player from '../Player/Player'
import BoardControls from './BoardControls'
import GeneralPopupMenu from '.././shared/popups/GeneralPopupMenu'
// import '../App.css'


class MainGame extends Component {

    render() {
        return (
            <div>
                <GeneralPopupMenu />

                <hr></hr>
                <div className="game-screen">
                    <div className="main-controls">
                        <Player player="Player_1" />
                        <BoardControls />
                        <Player player="Player_2" />
                    </div>
                    <Board />
                </div>
            </div>
        )
    }
}

export default MainGame