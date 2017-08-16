import React from 'react'
import './Time.css'

const formatTime = datetime => {
  const hours = datetime.getUTCHours()
  const minutes = ('0' + datetime.getUTCMinutes()).slice(-2)
  return hours + ':' + minutes
}

const Time = ({datetime}) => (
  <div className="Time">
    { formatTime(datetime) }
  </div>
)

export default Time
