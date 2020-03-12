const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestBody'))
morgan.token('requestBody', function (req, _) { return JSON.stringify(req.body) })

app.use(cors())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (_, res) => {
    res.json(persons)
})

app.get('/info', (_, res) => {
    const n = persons.length

    res.send(
        `<div>Phonebook has info for ${n} people</div><div>${new Date()}</div>`
    )
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 99999) + 1000
}

const isAlreadyInPhonebook = (name) => {
    return persons.filter(p => p.name === name).length > 0
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    const { name, number } = body
    if (!name || !number) {
        return response.status(400).json({
            error: 'name or number field is missing'
        })
    }

    if (isAlreadyInPhonebook(name)) {
        return response.status(409).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name,
        number
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})