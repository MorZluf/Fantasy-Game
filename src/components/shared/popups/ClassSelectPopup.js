import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import '../../../style/greetingsmenu.css'
import { BrowserRouter as Route, Link } from 'react-router-dom'
import ChooseClassPopup from '../popups/ChooseClassPopup';



@inject("gameStore", "generalStore")
@observer
class ClassSelectPopup extends Component {

    hideClassSelectPopup = () =>{
        this.props.gameStore.isShowClassSelectPopup = false
    }

    render(){
        return(
            <div className="select-class-container">
                {this.props.gameStore.game.arrClasses.map((c, i) =><ChooseClassPopup key={i} class={c}/>)}
                
                
                <Link to="/"><button onClick={this.hideClassSelectPopup}>Back</button></Link>               
            </div>
        )
    }
}

export default ClassSelectPopup
