import React, { Component } from 'react'
import '../../style/card.css'

class AdventureCard extends Component {

    render() {
        let card = this.props.details

        return (
            <div className="card">
                <p> <b>{card.title}</b></p>
                
                <div className="img-container">
                    <img src={card.img} alt="Img" 
                    className={card.type =="enemy" ? "enemy-img" : "card-img"} />
                </div>
                
                <span className="item-type">{card.type}</span>
                <hr></hr>
                <p className={card.type == "enemy" ? "display" : "dont-display"}>Strength : {card.stats.strength}</p>
                <p>{card.text}</p>
            </div>
        )
    }
}

export default AdventureCard