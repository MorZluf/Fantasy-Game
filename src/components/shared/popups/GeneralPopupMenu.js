import React, { Component } from 'react';
import CombatPopup from './CombatPopup';
import { observer, inject } from 'mobx-react'
import VillagePopup from './VillagePopup';
import FieldPopup from './FieldPopup';
import BattleStartPopup from './BattleStartPopup';
import WinLostPopup from './WinLostPopup';
@inject("gameStore")

@observer
class GeneralPopupMenu extends Component {

    renderPopup = () => {
        let popupToShow = ""
        switch (this.props.gameStore.game.popupType) {
            case "combat_popup":
                popupToShow = <CombatPopup />;
                break;
            case "start_battle":
                popupToShow = <BattleStartPopup />;
                break;
            case "continue_battle":
                popupToShow = "continue_battle";
                break;
            case "show_win_lose":
                popupToShow = <WinLostPopup />;
                break;
            case "village_options":
                popupToShow = <VillagePopup />;
                break;
            case "field_options":
                popupToShow = <FieldPopup />;
                break;
            case "":
                popupToShow = null;
                break;
        }
        return popupToShow
    }

    componentDidMount() {
        this.props.gameStore.getFightState()
    }
    
    render() {
        console.log("ToDo: " + ["in game.js line 93", " in game.js line 19"])
        return (
            <div className="general-popup-container" >
                {this.renderPopup()}
            </div>
        )
    }
}

export default GeneralPopupMenu;