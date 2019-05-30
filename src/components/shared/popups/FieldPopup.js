import React, { Component } from 'react';

class FieldPopup extends Component {
    drawCard = () => {
        console.log("drawing card...")
    }
    render() {
        return (
            <div className="field-popup">
                <button onClick={this.drawCard}>Draw Card2</button>
            </div>
        )
    }
}

export default FieldPopup;