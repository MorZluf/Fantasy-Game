import React, { Component } from 'react';

class SingleBoardControl extends Component {

    render() {
        return (
             <div><button>{this.props.text}</button></div>
        )
    }
}

export default SingleBoardControl;