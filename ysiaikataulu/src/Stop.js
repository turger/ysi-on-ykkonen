import React from 'react'

const readableTime = timestamp => {
  const theDate = new Date(timestamp * 1000)
  const hours = ('0' + theDate.getUTCHours()).slice(-2)
  const minutes = ('0' + theDate.getUTCMinutes()).slice(-2)
  return `${hours}:${minutes}`
}

const Stop = ({stops}) => (
  <ul>
    {stops.map(stopTime =>
      <li key={`${stopTime.trip.route.gtfsId}-${stopTime.scheduledArrival}`}>
        {stopTime.trip.route.shortName} {stopTime.trip.route.longName}
        {' '}<strong>{readableTime(stopTime.scheduledDeparture)}</strong>
      </li>
    )}
  </ul>
)

export default Stop
