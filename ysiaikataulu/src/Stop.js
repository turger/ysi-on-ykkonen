import React from 'react'
import './Stop.css'

const minutesToDeparture = departureTimestamp => {
  const depDate = new Date(departureTimestamp * 1000)
  const currDate = new Date()
  const depTimeInMinutes = (depDate.getUTCHours()*60)+depDate.getUTCMinutes()
  const currTimeInMinutes = (currDate.getHours()*60)+currDate.getMinutes()
  const minutesToDeparture = depTimeInMinutes-currTimeInMinutes
  // TO-DO: move hours check to jsx
  // const hours = Math.floor(minutesToDeparture / (60))
  // const minutes = Math.floor(minutesToDeparture % (60))
  return minutesToDeparture
}

const Stop = ({stops}) => (
  <div className="Stop">
    {stops
      .slice(0, 2)
      .map(stopTime =>
        <div className="Stop__box" key={`${stopTime.trip.route.gtfsId}-${stopTime.scheduledArrival}`}>
          <div className="Stop__box--time">
            {stopTime.trip.route.shortName} {minutesToDeparture(stopTime.scheduledDeparture)}min
          </div>
        </div>
    )}
  </div>
)

export default Stop
