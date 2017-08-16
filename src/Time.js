import React from 'react'
import './Time.css'

const formatTime = datetime => {
  const hours = datetime.getHours()
  const minutes = ('0' + datetime.getMinutes()).slice(-2)
  return hours + ':' + minutes
}

const Time = ({datetime}) => (
  <div className="Time">
    { formatTime(datetime) }
  </div>
)

export default Time
