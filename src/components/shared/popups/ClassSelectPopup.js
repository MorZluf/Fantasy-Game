import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import '../../../style/greetingsmenu.css'
import { BrowserRouter as Route, Link } from 'react-router-dom'



@inject("gameStore")
@observer
class ClassSelectPopup extends Component {

    hideClassSelectPopup = () =>{
        this.props.gameStore.isShowClassSelectPopup = false
    }
    
    render(){
        return(
            <div className="select-class-container">
                {console.log(this.props.gameStore.game.arrClasses)}
                
                <button className="btn" 
                onClick={this.hideClassSelectPopup}>
                    <Link to="/board">Create New Game</Link></button>                
            </div>
        )
    }
}

export default ClassSelectPopup
