import React from 'react'
import './Stop.css'
import { minutesToDeparture } from './utils/utils'

const Stop = ({stops}) => (
  <div className="Stop">
    {stops
      .slice(0, 2)
      .map(stopTime =>
        <div className="Stop__box" key={`${stopTime.trip.route.gtfsId}-${stopTime.realtimeArrival}`}>
          <div className="Stop__box--name">
            {stopTime.trip.route.shortName}
          </div>
          <div className="Stop__box--time">
            {minutesToDeparture(stopTime.realtimeArrival)}
          </div>
        </div>
    )}
  </div>
)

export default Stop
