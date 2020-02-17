import React from 'react'
import Country from './Country'
import CountrySearchResult from './CountrySearchResult'

const CountrySearchResults = ({ countries }) => {
    if (countries.length === 1) {
        return <Country data={countries[0]} />
    } else {
        return countries.map(
            country => <CountrySearchResult key={country.name} country={country} />
        )
    }
}

export default CountrySearchResults