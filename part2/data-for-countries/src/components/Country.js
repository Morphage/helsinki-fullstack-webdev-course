import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const Weather = ({ city }) => {
    const [cityWeatherData, setCityWeatherData] = useState({})

    useEffect(() => {
        axios
            .get(`https://www.metaweather.com/api/location/search/?query=${city}`)
            .then(response => {
                const woeid = response.data[0].woeid

                axios
                    .get(`https://www.metaweather.com/api/location/${woeid}/`)
                    .then(response => {
                        const weather = response.data.consolidated_weather[0]
                        setCityWeatherData({
                            temperature: weather.the_temp.toFixed(2),
                            stateIcon: 'https://www.metaweather.com/static/img/weather/s.svg',
                            windSpeed: weather.wind_speed.toFixed(2),
                            windDirection: weather.wind_direction.toFixed(2)
                        })
                    })
            })
    }, [])

    return (
        <div>
            <h2>Weather in {city}</h2>
            <h3>temperature: {cityWeatherData.temperature}°C</h3>
            <img alt="Weather state" src={cityWeatherData.stateIcon} width="100px" height="100px" />
            <h3>wind: {cityWeatherData.windSpeed}mph in {cityWeatherData.windDirection} degrees direction</h3>
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
            <Weather city={data.capital} />
        </div>
    )
}

export default Country