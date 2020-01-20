import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const GiveFeedbackComponent = ({ feedbackClickHandlers }) => {
    return (
        <div>
            <h1>give feedback</h1>
            {
                Object.keys(feedbackClickHandlers).map(handler => 
                    <Button key={handler} 
                            handleClick={feedbackClickHandlers[handler]} 
                            text={handler}/>
                )
            }
        </div>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = ({ feedback }) => {
    const total = Object.values(feedback).reduce((acc, elem) => acc + elem, 0)

    if (total === 0) {
        return (
            <div>
                <h1>statistics</h1>
                No feedback given
            </div>
        )
    }

    const average  = (feedback.good - feedback.bad) / total
    const positive = (feedback.good / total) * 100

    return (
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <Statistic text="good"     value={feedback.good} />
                    <Statistic text="neutral"  value={feedback.neutral} />
                    <Statistic text="bad"      value={feedback.bad} />
                    <Statistic text="all"      value={total} />
                    <Statistic text="average"  value={average} />
                    <Statistic text="positive" value={positive + "%"} />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const feedback = { "good": good, "neutral": neutral, "bad": bad}
    const feedbackClickHandlers = {
        "good": () => setGood(good + 1),
        "neutral": () => setNeutral(neutral + 1),
        "bad": () => setBad(bad + 1)
    }

    return (
        <div>
            <GiveFeedbackComponent feedbackClickHandlers={feedbackClickHandlers} />
            <Statistics feedback={feedback} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
