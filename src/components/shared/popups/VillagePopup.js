import React, { Component } from 'react';

class VillagePopup extends Component {

    buyStuff = () => {
        console.log("buying stuff...")
    }
    render() {
        return (
            <div className="village-popup">
                <h4>Village-Popup</h4>
                <button onClick={this.buyStuff}>Buy Stuff</button>
            </div>
        )
    }
}

export default VillagePopup;