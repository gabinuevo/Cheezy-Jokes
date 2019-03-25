import React, { Component } from 'react'


class Joke extends Component {

    constructor(props){
        super(props);
        this.triggerUpvote = this.triggerUpvote.bind(this);
        this.triggerDownvote = this.triggerDownvote.bind(this);
    }

    triggerUpvote() {
        this.props.triggerUpvote(this.props.id)
    }

    triggerDownvote() {
        this.props.triggerDownvote(this.props.id)
    }

    // only render the component that has changed.
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.score !== nextProps.score;
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