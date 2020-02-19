import React from 'react'
import Person from './Person'
import personService from '../services/persons'

const Persons = ({ persons, setPersons }) => {
  const removePerson = (person) => {
    window.confirm(`Delete ${person.name}?`)

    personService
      .remove(person.id)
      .then(_response => {
        const newPersons = persons.filter(p => p.id !== person.id)
        setPersons(newPersons)
      })
  }

  return (
    persons.map(person =>
      <div key={person.id}>
        <Person
          name={person.name}
          number={person.number}
        />
        <button onClick={() => removePerson(person)}>
          delete
        </button>
      </div>
    )
  )
}

export default Persons