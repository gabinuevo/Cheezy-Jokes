import React, { Component } from 'react'
import Joke from './Joke'
import axios from 'axios'

const BASE_URL = 'https://icanhazdadjoke.com'
const JOKES_NUM = 10;

class Jokes extends Component {

    constructor(props){
        super(props);
        this.state = {
            jokes: [],
            loading: true
        }
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

    // Function to upvote specific joke. keeps target joke in place.
    upvote(id){
        this.setState({jokes: this.state.jokes
            .map((j) => id===j.id ? {...j, score: j.score + 1} : j )
        })
    }

    downvote(id){
        this.setState({jokes: this.state.jokes
            .map((j) => id===j.id ? {...j, score: j.score - 1} : j )
        })
    }

    async getJoke(){
       let joke = await axios.get(`${BASE_URL}`,
        {headers: {Accept: 'application/json'}});
        return {id: joke.data.id, text: joke.data.joke, score:0}
    }
    
    /** using "seen pattern" to make sure there is no repeat joke
     * 
    */
    async componentDidMount() {
        let jokes=[];
        let jokeIds = new Set(jokes);

        while (jokes.length !== JOKES_NUM) {
            let joke = await this.getJoke();

            if (!jokeIds.has(joke.id)) {
                jokes.push(joke);
                jokeIds.add(joke.id);
            }
        }

        this.setState({jokes: jokes,loading: false});
    }

    render() {
        let jokes = this.state.jokes.map(({id,score,text}) => <Joke key={id} 
                                                      id={id}
                                                      text={text} 
                                                      score={score}
                                                      triggerUpvote={this.upvote}
                                                      triggerDownvote={this.downvote}/>)
        return(
            <div className='Jokes'>
                <h1> DAD JOKES </h1>
                {this.state.loading ? <h1>Loading....</h1> : <b>{jokes}</b>}
                
            </div>
        )
    }
}


export default Jokes