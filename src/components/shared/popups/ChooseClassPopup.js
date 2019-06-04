import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import '../../../style/greetingsmenu.css'
import ClassPopUp from '../popups/ClassPopup'
import { BrowserRouter as Route, Link } from 'react-router-dom'


@inject("gameStore", "generalStore")
@observer
class ChooseClassPopup extends Component {
    
    setPlayerDetails = () => {
        let className = this.props.class.name
        this.props.gameStore.setPlayerClass(this.props.generalStore.input, className)
    }
    
    render(){
        return(
            <div>
                <ClassPopUp key={this.props.key} class={this.props.class} />
                <button onClick={this.setPlayerDetails}><Link to='/board'>Choose</Link></button>
            </div>
        )
    }
}

export default ChooseClassPopup
