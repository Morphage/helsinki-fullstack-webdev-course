import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [notification, setNotification] = useState({})

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
            <Notification message={notification.message} level={notification.level} />
            <Filter filter={filter} setNewFilter={setNewFilter} />

            <h2>add a new</h2>
            <PersonForm
                persons={persons} 
                setPersons={setPersons} 
                setNotification={setNotification} />

            <h2>Numbers</h2>
            <Persons persons={visiblePersons} setPersons={setPersons} />
        </div>
    )
}

export default App