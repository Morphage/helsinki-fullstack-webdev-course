import React, { useState } from 'react'

const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const hasPersonAlreadyBeenAdded = (name) => {
        return persons.filter(p => p.name === name).length > 0
    }

    const addPerson = (event) => {
        event.preventDefault()

        if (newName === '' || newNumber === '')
            return

        if (hasPersonAlreadyBeenAdded(newName)) {
            return alert(`${newName} is already added to phonebook`)
        }

        const newPerson = { name: newName, number: newNumber }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
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