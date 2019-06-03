import React, { Component } from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom'
import '../../../style/instructions.css'

class Instructions extends Component {

    render() {
        return (
            <div className="instructions-container">
                <h1>This is definitely not Talisman !</h1>
                <button className="btn"><Link to="/">Back</Link></button>
            </div>
        )
    }
}

export default Instructions