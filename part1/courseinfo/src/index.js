import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return <h1>{props.name}</h1>
}

const Part = (props) => {
    return <p>{props.name} {props.exercises}</p>
}

const Content = (props) => {
    return props.parts.map(part => (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
    ))
}

const Total = (props) => {
    const total = props.parts.reduce((a, b) => a + b.exercises, 0)
    return <p>Number of exercises {total}</p>
}

const Course = (props) => {
    return (
        <div>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            { name: 'Fundamentals of React', exercises: 10 },
            { name: 'Using props to pass data', exercises: 7 },
            { name: 'State of a component', exercises: 14 }
        ]
    }

    return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))