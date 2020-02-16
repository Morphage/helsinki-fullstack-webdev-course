import React from 'react'

const Languages = ({ languages }) => {
    return (
        <div>
            <h2>languages</h2>
            <ul>
                {
                    languages.map(language => {
                        return <li key={language.name}>{language.name}</li>
                    })
                }
            </ul>
        </div>
    )
}

const Country = ({ data }) => {
    return (
        <div>
            <h1>{data.name}</h1>
            <div>capital {data.capital}</div>
            <div>population {data.population}</div>
            <Languages languages={data.languages} />
            <img alt="Flag" src={data.flag} width="100px" height="100px" />
        </div>
    )
}

export default Country