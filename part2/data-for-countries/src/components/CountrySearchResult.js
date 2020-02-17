import React, { useState } from 'react'
import Country from './Country'

const CountrySearchResult = ({ country }) => {
    const [showCountry, setShowCountry] = useState(false)
    const toggleShowCountry = () => {
        setShowCountry(!showCountry)
    }

    if (showCountry) {
        return (
            <div>
                {country.name} <button onClick={toggleShowCountry}>close</button>
                <Country data={country} />
            </div>
        )
    }

    return (
        <div>
            {country.name} <button onClick={toggleShowCountry}>show</button>
        </div>
    )
}

export default CountrySearchResult