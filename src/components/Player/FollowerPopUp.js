import React, { Component } from 'react'

class FollowerPopUp extends Component {
    render(){
        const followers = this.props.followers
        return (<div>
            <h4 onClick={this.props.close}>Followers</h4>
            {followers.map((i, j) => <div key={j}>{i}</div>)}
        </div>)
    }
}

export default FollowerPopUp