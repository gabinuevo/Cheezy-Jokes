import React, { Component } from 'react'


class Joke extends Component {

    constructor(props){
        super(props);
        this.triggerUpvote = this.triggerUpvote.bind(this);
        this.triggerDownvote = this.triggerDownvote.bind(this);
    }

    triggerUpvote() {
        
        this.props.tellParentToUpvote(this.props.id)
    }


    triggerDownvote() {
        // TODO
        console.log('IGNORE ME, triggerDownvote')
    }

    render() {
        return(
            <div className='Joke'>
                <p>{this.props.text}</p>
                <p>{this.props.score}</p>
                <button onClick={this.triggerUpvote}>Upvote</button>
                <button onClick={this.triggerDownvote}>Downvote</button>
            </div>
        )
    }
}


export default Joke