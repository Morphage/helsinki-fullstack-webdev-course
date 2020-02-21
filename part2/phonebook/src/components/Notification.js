import React from 'react'

const Notification = ({ message, level }) => {
    if (!message) {
        return null
    }

    return (
        <div className={`notification ${level}`}>
            {message}
        </div>
    )
}

export default Notification