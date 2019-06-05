import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import '../../../style/card.css'

@inject("gameStore")
@observer
class Item extends Component {

    render() {
        let item = this.props.item
        return (
            <div className="card" >
                
                <p><b>{item.title}</b></p>
                <div className="img-container">

                <img src={item.img} alt="img of item" className="card-img"/>
                </div>
                <span class="item-type">{item.type}</span>
                <hr></hr>
                <p>{item.text}</p>
                <p>Price : 1 Gold</p>
            </div>
        )
    }
}

export default Item