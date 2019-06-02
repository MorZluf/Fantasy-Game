import React, { Component } from 'react'

class AdventureCard extends Component {
    render(){
        return (<div>
            I am a {this.props.details.title}
        </div>)
    }
}

export default AdventureCard