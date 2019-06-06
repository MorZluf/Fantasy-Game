import React, { Component } from 'react'

class FollowerPopUp extends Component {
    render(){
        const followers = this.props.followers
        return (<div className="follower-collection">
            <h4>Followers</h4>
            {followers.map((i, j) => <div key={j}>{i.title}</div>)}
        </div>)
    }
}

export default FollowerPopUp