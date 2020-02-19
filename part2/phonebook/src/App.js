import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const [filter, setNewFilter] = useState('')

    const visiblePersons =
        persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setNewFilter={setNewFilter} />

            <h2>add a new</h2>
            <PersonForm persons={persons} setPersons={setPersons} />

            <h2>Numbers</h2>
            <Persons persons={visiblePersons} setPersons={setPersons} />
        </div>
    )
}

export default App