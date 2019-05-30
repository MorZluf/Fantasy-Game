import React, { Component } from 'react';

class VillagePopup extends Component {
 
    buyStuff = () => {
        console.log("buying stuff...")
    }
    render() {
        return (
             <div className="village-popup">
                 <button onClick={this.buyStuff}>Buy Stuff2</button>
             </div>
        )
    }
}

export default VillagePopup;