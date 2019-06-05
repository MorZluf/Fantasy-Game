import React, { Component } from 'react';
import '../../../style/popups.css'

class EndGame extends Component {

    render() {
        return (
            <div className="end-game">
                <h1>Congratulations {"player XXX"}! You are the Winner!</h1>
            </div>
            )
        }
    }
    
    export default EndGame