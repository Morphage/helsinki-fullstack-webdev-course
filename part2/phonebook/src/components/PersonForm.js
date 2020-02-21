import React, { useState } from 'react'
import personsService from '../services/persons'

const PersonForm = ({ persons, setPersons, setNotification }) => {
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
                setNotification({
                    message: `Added ${createdPerson.name}`,
                    level: 'info'
                })
                setTimeout(() => {
                    setNotification({})
                }, 5000)
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
                setNotification({
                    message: `Updated ${personToUpdate.name}`,
                    level: 'info'
                })
                setTimeout(() => {
                    setNotification({})
                }, 5000)
                setNewName('')
                setNewNumber('')
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setNotification({
                        message: `${personToUpdate.name} has already been removed from server`,
                        level: 'error'
                    })
                    setTimeout(() => {
                        setNotification({})
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                }
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