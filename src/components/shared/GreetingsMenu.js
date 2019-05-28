import React, { Component } from 'react';

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
            <datalist id="clientList">
                {arrOptions}
            </datalist>
        )
    }

    render() {
        return (
             <div className="greetings-menu">
                <h5>Greeting menu with options.</h5>
                <input type="text" placeholder="Enter your name..." />
                <input list="room-list" name="room" placeholder="Select room" />
                {this.getListOfRooms()}
                <button onChange={this.doSomething}>Get into room</button>
             </div>
        )
    }
}

export default GreetingsMenu;