import React, { Component } from 'react'

class InventoryPopUp extends Component {
    render(){
        const inventory = this.props.inventory
        return (<div>
            <h4 onClick={this.props.close}>Inventory:</h4>
            {inventory.map((i, j) => <div key={j}>{i.title}</div>)}
        </div>)
    }
}

export default InventoryPopUp