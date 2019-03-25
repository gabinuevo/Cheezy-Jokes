import React, { Component } from 'react'
import Joke from './Joke'
import axios from 'axios'

const BASE_URL = 'https://icanhazdadjoke.com'

class Jokes extends Component {

    constructor(props){
        super(props);
        this.state = {
            jokes: [],
        }
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

    // Function to upvote specific joke. keeps target joke in place.
    upvote(id){
        this.setState({jokes: this.state.jokes.map((j) => {
                                            if (id===j.id){
                                                return {...j, score: j.score + 1}
                                            } return j 
                                        })})
    }

    downvote(id){
        this.setState({jokes: this.state.jokes.map((j) => {
                                            if (id===j.id){
                                                return {...j, score: j.score - 1}
                                            } return j 
                                        })})
    }

    async componentDidMount() {
        const jokes = await axios.get(`${BASE_URL}/search?limit=10`,
                                        {headers: {Accept: 'application/json'}});

        let jokesData = jokes.data.results.map((j) => {
            return {id: j.id, text: j.joke, score:0}
        })

        this.setState({jokes: jokesData});
    }

    render() {
        let jokes = this.state.jokes.map((j) => <Joke key={j.id} 
                                                      id={j.id}
                                                      text={j.text} 
                                                      score={j.score}
                                                      triggerUpvote={this.upvote}
                                                      triggerDownvote={this.downvote}/>)
        return(
            <div className='Jokes'>
                <h1> DAD JOKES </h1>
                {jokes}
            </div>
        )
    }
}


export default Jokes