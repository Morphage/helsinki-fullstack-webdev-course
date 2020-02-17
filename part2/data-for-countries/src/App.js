import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountrySearchResults from './components/CountrySearchResults'

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
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const filteredCountries = filter === ''
        ? []
        : countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange} />
            {
                (filteredCountries.length >= 10) &&
                <div>Too many matches, specify another filter</div>
            }
            {
                (filteredCountries.length < 10) &&
                <CountrySearchResults countries={filteredCountries} />
            }
        </div>
    )
}

export default App