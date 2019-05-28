import React, { Component } from 'react';
import Card from '../Card';

class CombatPopup extends Component {

    render() {
        return (
            <div>A combat popups
             <h4>a fight between 2 cards</h4>
                <Card oponent="player" stats="someStats"></Card>
                <Card oponent="enemy" stats="someStats"></Card>
            </div>
        )
    }
}

export default CombatPopup;