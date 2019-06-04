import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import '../../../style/greetingsmenu.css'
import { BrowserRouter as Route, Link } from 'react-router-dom'

@inject("gameStore", "generalStore")
@observer
class ClassPopup extends Component {
    
    
    
    
    render() {
        let charClass = this.props.charClass
        let stats = charClass.stats
        return (
            <div className="class-popup-container">
                <div className="class-card" >

                    <h3>{charClass.name}</h3>
                    <img className="classImg" src={charClass.img} alt="class img" />
                    <h5>Special Abilities:</h5>
                    <p>{charClass.specialAbilities.map((ability, i) => <span key={i} className="ability">{ability}</span>)}</p>
                    <div className="class-stats">
                        <p> Strength : {stats.strength} </p>
                        <p> Craft : {stats.craft} </p>
                        <p> Life : {stats.life} </p>
                        <p> Gold : {stats.gold} </p>
                    </div>
                </div>

            </div>
        )
    }
}

export default ClassPopup