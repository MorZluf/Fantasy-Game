import React, { Component } from 'react';

@inject("gameStore", "generalStore")

@observer
class CombatDie extends Component {

    render() {
        return (
             <div>
                 <div className="die-image"></div>
                 <button>Roll</button>
             </div>
        )
    }
}

export default CombatDie;