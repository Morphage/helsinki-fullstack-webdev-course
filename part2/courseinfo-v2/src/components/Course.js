import React from 'react'

const Header = (props) => {
    return <h2>{props.name}</h2>
}

const Part = (props) => {
    return <p>{props.name} {props.exercises}</p>
}

const Content = (props) => {
    return props.parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))
}

const Total = (props) => {
    const total = props.parts.reduce((a, b) => a + b.exercises, 0)
    return <b>total of {total} exercises</b>
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

export default Course