import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import '../../../style/greetingsmenu.css'
import ClassPopUp from '../popups/ClassPopup'
import { Link } from 'react-router-dom'


@inject("gameStore", "generalStore")
@observer
class ChooseClassPopup extends Component {
    
    setPlayerDetails = () => {
        let className = this.props.class.name
        this.props.gameStore.setPlayerClass(this.props.generalStore.input, className)
    }
    
    render(){
        return(
            <div className="choose-class-btn-container">
                <ClassPopUp key={this.props.key} charClass={this.props.class} />
                <button onClick={this.setPlayerDetails}><Link to='/board'>Choose</Link></button>
            </div>
        )
    }
}

export default ChooseClassPopup
