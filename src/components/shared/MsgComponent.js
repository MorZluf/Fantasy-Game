import React, { Component } from 'react';

class MsgComponent extends Component {

    render() {
        return (
             <div>
                 {this.props.msg}
             </div>
        )
    }
}

export default MsgComponent;