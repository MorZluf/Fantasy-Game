import React, { Component } from 'react';
import '../../style/greetingsmenu.css'
import { BrowserRouter as Route, Link } from 'react-router-dom'
import { GameStore } from '../../stores/GameStore';
import ClassSelectPopup from './popups/ClassSelectPopup';
import { observer, inject } from 'mobx-react'


@inject("gameStore", "generalStore")
@observer
class GreetingsMenu extends Component {
    // getListOfRooms = () => {
    //     let arrRooms = ["room1", "room2", "room3"]
    //     let arrOptions = []
    //     for (let i = 0; i < arrRooms.length; i++) {
    //         let curOption = <option key={arrRooms[i]} value={arrRooms[i]}></option>
    //         arrOptions.push(curOption)
    //     }
    //     return (
    //         <datalist id="room-list">
    //             {arrOptions}
    //         </datalist>
    //     )
    // }

    showClassSelectPopup = () =>{
        this.props.gameStore.isShowClassSelectPopup = true
    }

    handleInput = event => { this.props.generalStore.handleInput(event) }

    render() {
        return (
             <div className="greetings-menu">
                <input className="inpt" type="text" placeholder=" Enter your name" onChange={this.handleInput}/>
                {/* <input className="inpt" list="room-list" name="room" placeholder=" Select room" />
                {this.getListOfRooms()} */}
                <button className="btn" onClick={this.showClassSelectPopup}>Enter Game</button>
                <button className="btn"><Link to="/instructions">Instructions</Link></button>
                {/* <button className="btn">Join New Game</button>
                <button className="btn">Continue Game</button> */}
                {this.props.gameStore.isShowClassSelectPopup ? <ClassSelectPopup /> : null}
             </div>
        )
    }
}

export default GreetingsMenu;