import React, { Component } from 'react';

class GreetingsMenu extends Component {
    doSomething = () => {
        console.log("doing something in greetings menu...")
    }
    doSomething1 = () => {
        console.log("doing something1 in greetings menu...")
    }
    getListOfRooms = () => {
        let result = []
        let arrRooms = ["room1", "room2", "room3"]
        result.push(<option disabled selected value="">Choose room</option>)
        arrRooms.forEach(room => {
            let curOption = <option value={room}>{room}</option>
            result.push(curOption)
        })
        return result
    }
    render() {
        return (
             <div className="greetings-menu">
                <h5>Greeting menu with options.</h5>
                <input type="text" placeholder="Enter your name..." />
                <select name="room" onChange={this.doSomething1}>{this.getListOfRooms()}</select>
                <button onChange={this.doSomething}>Get into room</button>
             </div>
        )
    }
}

export default GreetingsMenu;