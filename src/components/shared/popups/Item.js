import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import '../../../style/card.css'

@inject("gameStore")
@observer
class Item extends Component {

    render() {
        let item = this.props.item
        return (
            <div class="card">
                
                <h4>{item.title}</h4>
                <img src={item.img} alt="img of item"/>
                <span class="item-type">{item.type}</span>
                <br></br>
                <p>{item.text}</p>
            </div>
        )
    }
}

export default Item