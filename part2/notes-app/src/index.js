import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const notes = [
    {
        id: 1,
        content: 'HTML is easy',
        date: '2019-05-30T17:30:31.098Z',
        isImportant: true
    },
    {
        id: 2,
        content: 'Browser can execute only Javascript',
        date: '2019-05-30T18:39:34.091Z',
        isImportant: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2019-05-30T19:20:14.298Z',
        isImportant: true
    }
]

ReactDOM.render(
    <App notes={notes} />,
    document.getElementById('root')
)