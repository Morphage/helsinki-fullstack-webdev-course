import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const nextAnecdote = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length))
    }

    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
    const vote = (selectedAnecdote) => () => {
        const updatedVotes = [...votes]
        updatedVotes[selectedAnecdote] += 1
        setVotes(updatedVotes)
    }

    const mostVotes = Math.max(...votes)
    const anecdoteWithMostVotes = votes.indexOf(mostVotes)

    return (
        <div>
            <div>
                <h1>Anecdote of the day</h1>
                {props.anecdotes[selected]} <br />
                has {votes[selected]} votes <br />
                <button onClick={vote(selected)}>vote</button>
                <button onClick={nextAnecdote}>next anectode</button>
            </div>

            <div>
                <h1>Anecdote with most votes</h1>
                {props.anecdotes[anecdoteWithMostVotes]} <br />
                has {mostVotes} votes
            </div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)