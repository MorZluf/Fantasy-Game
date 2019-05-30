import React, { Component } from 'react';
import CombatPopup from './CombatPopup';
import { observer, inject } from 'mobx-react'
import VillagePopup from './VillagePopup';
import FieldPopup from './FieldPopup';

@inject("gameStore")

@observer
class GeneralPopupMenu extends Component {
   
    renderfieldOptions = () =>
        this.props.gameStore.getTileType() === "Fields" ? <button onClick={this.drawCard}>Draw Card2</button> : null

    renderVillageOptions = () =>
        this.props.gameStore.getTileType() === "Village" ? <button onClick={this.buyStuff}>Buy Stuff2</button> : null

    renderPopup = () => {
        let popupToShow = ""
        switch (this.props.gameStore.popupType) {
            case "combat_popup":
                popupToShow = <CombatPopup />;
                break;
            case "start_battle":
                popupToShow = "start_battle";
                break;
            case "continue_battle":
                popupToShow = "continue_battle";
                break;
            case "show_win_lose":
                popupToShow = "show_win_lose";
                break;
            case "village_options":
                popupToShow = <VillagePopup />;
                break;
            case "field_options":
                popupToShow = <FieldPopup />;
                break;
        }
        return popupToShow
    }

    render() {
        return (
            <div className="general-popup-container">
                {this.renderPopup()}
            </div>
        )
    }
}

export default GeneralPopupMenu;