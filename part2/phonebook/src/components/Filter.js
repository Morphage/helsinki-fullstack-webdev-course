import React from 'react'

const Filter = ({ filter, setNewFilter }) => {
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            filter shown with <input value={filter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter