import React, { Component } from 'react';

class FieldPopup extends Component {
    drawCard = () => {
        console.log("drawing card...")
    }
    render() {
        return (
            <div className="field-popup">
                <h4>Field-Popup</h4>
                <button onClick={this.drawCard}>Draw Card</button>
            </div>
        )
    }
}

export default FieldPopup;