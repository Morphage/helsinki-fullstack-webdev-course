import React, { useState } from 'react'
import personsService from '../services/persons'

const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const findPersonWith = (name) => {
        return persons.find(p => p.name === name)
    }

    const createPerson = (newPerson) => {
        personsService
            .create(newPerson)
            .then(createdPerson => {
                setPersons(persons.concat(createdPerson))
                setNewName('')
                setNewNumber('')
            })
    }

    const updatePerson = (personToUpdate) => {
        personsService
            .update(personToUpdate.id, personToUpdate)
            .then(() => {
                const updatedPersons = persons.map(p =>
                    p.id === personToUpdate.id ? personToUpdate : p
                )
                setPersons(updatedPersons)
                setNewName('')
                setNewNumber('')
            })
    }

    const addPerson = (event) => {
        event.preventDefault()

        if (newName === '' || newNumber === '')
            return

        const person = { name: newName, number: newNumber }
        const existingPerson = findPersonWith(newName)
        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                person.id = existingPerson.id
                updatePerson(person)
            }
        } else {
            createPerson(person)
        }
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNewName} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNewNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm