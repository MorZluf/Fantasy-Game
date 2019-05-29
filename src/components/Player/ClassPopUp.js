import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject("dataStore")
@observer
class ClassPopUp extends Component {
    constructor() {
        super()
        this.state = {
            charClass: {
                name: "",
                img: "",
                specialAbilities: []
            }
        }
    }

    async componentDidMount() {
        let charClass = await this.props.dataStore.getClass(this.props.charClass)
        this.setState({ charClass: charClass })
    }

    render(){
        const charClass = this.state.charClass
        return (<div>
            <h4 onClick={this.props.close}>{charClass.name}</h4>
            <img src={charClass.img} alt={`a ${charClass.name}`}/>
            {charClass.specialAbilities.map((a, i) => <div key={a + i}>{a}</div>)}
        </div>)
    }
}

export default ClassPopUp