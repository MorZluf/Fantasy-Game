import React, { Component } from 'react';
import '../../style/greetingsmenu.css'
import { BrowserRouter as Route, Link } from 'react-router-dom'



class GreetingsMenu extends Component {
    doSomething = () => {
        console.log("doing something in greetings menu...")
    }
    getListOfRooms = () => {
        let arrRooms = ["room1", "room2", "room3"]
        let arrOptions = []
        for (let i = 0; i < arrRooms.length; i++) {
            let curOption = <option key={arrRooms[i]} value={arrRooms[i]}></option>
            arrOptions.push(curOption)
        }
        return (
            <datalist id="room-list">
                {arrOptions}
            </datalist>
        )
    }

    render() {
        return (
             <div className="greetings-menu">
                <input className="inpt" type="text" placeholder=" Enter your name" />
                <input className="inpt" list="room-list" name="room" placeholder=" Select room" />
                {this.getListOfRooms()}
                <br/>
                <button className="btn"><Link to="/instructions">Instructions</Link></button>
                <button className="btn"><Link to="/board">Create New Game</Link></button>
                <button className="btn"><Link to="/board">Join New Game</Link></button>
                <button className="btn"><Link to="/board">Continue Game</Link></button>
             </div>
        )
    }
}

export default GreetingsMenu;