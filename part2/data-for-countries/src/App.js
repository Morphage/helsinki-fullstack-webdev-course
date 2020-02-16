import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const [filter, setFilter] = useState('')

    const filteredCountries = filter === ''
        ? []
        : countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleShow = () => {}

    const Countries = ({ countries }) => {
        if (countries.length === 1) {
            return <Country data={countries[0]} isMinimized={false} />
        } else {
            return countries.map(country =>
                <div key={country.name}>
                    {country.name} <button onClick={handleShow}>show</button>
                </div>
            )
        }
    }

    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange} />
            {
                (filteredCountries.length >= 10) &&
                <div>Too many matches, specify another filter</div>
            }
            {
                (filteredCountries.length < 10) &&
                <Countries countries={filteredCountries} />
            }
        </div>
    )
}

export default App