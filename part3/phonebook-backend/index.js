require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

app.use(bodyParser.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestBody'))
morgan.token('requestBody', function (req, _) { return JSON.stringify(req.body) })

app.use(express.static('build'))
app.use(cors())

app.get('/api/persons', (_, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts.map(contact => contact.toJSON()))
    })
})

app.get('/info', (_, response) => {
    Contact.count({}).then(count => {
        response.send(
            `<div>Phonebook has info for ${count} people</div><div>${new Date()}</div>`
        )
    })
})

app.get('/api/persons/:id', (request, response) => {
    Contact.findById(request.params.id).then(contact => {
        if (contact) {
            response.json(contact.toJSON())
        } else {
            response.status(404).end()
        }
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Contact.findByIdAndDelete(request.params.id).then(_ => {
        response.status(204).end()
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const { name, number } = body
    if (!name || !number) {
        return response.status(400).json({
            error: 'name or number field is missing'
        })
    }

    const contact = new Contact({
        name,
        number
    })

    contact.save().then(savedContact => {
        response.json(savedContact.toJSON())
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})