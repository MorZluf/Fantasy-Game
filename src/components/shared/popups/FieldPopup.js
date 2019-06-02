import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject("gameStore")
@observer
class FieldPopup extends Component {
    drawCard = () => {
        this.props.gameStore.drawAdventureCard()
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

export default FieldPopup