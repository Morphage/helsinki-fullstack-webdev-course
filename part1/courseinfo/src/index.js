import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Part = (props) => {
    return <p>{props.name} {props.numberOfExercises}</p>
}

const Content = (props) => {
    return props.parts.map(part => (
        <Part name={part.name} numberOfExercises={part.numberOfExercises} />
    ))
}

const Total = (props) => {
    const total = props.parts.reduce((a, b) => a + b.numberOfExercises, 0)
    return <p>Number of exercises {total}</p>
}

const App = () => {
    const course = 'Half Stack application development'

    const parts = [
        { name: 'Fundamentals of React', numberOfExercises: 10 },
        { name: 'Using props to pass data', numberOfExercises: 7 },
        { name: 'State of a component', numberOfExercises: 14 }
    ]

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))