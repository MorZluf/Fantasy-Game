import React, { Component } from 'react';
import CombatPopup from './CombatPopup';
import MenuPopup from './MenuPopup';

class PopupContainer extends Component {

    render() {
        return (
             <div className="general-popup">
             <h5>showing the popup according to type sent thru props</h5>
             {this.props.popup === "combat-popup" ? <CombatPopup /> : null}
             {this.props.popup === "menu-popup" ? <MenuPopup /> : null }
             </div>
        )
    }
}

export default PopupContainer;