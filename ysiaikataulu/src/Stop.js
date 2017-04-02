import React from 'react'
import classNames from 'classnames'
import './Stop.css'
import { minutesToDeparture } from './utils/utils'

const Stop = ({stops}) => (
  <div className="Stop">
    {stops
      .filter(stopTime =>
        !Number.isInteger(minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)) ||
        minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay) > 5)
      .slice(0, 2)
      .map(stopTime =>
        <div className="Stop__box" key={`${stopTime.trip.route.gtfsId}-${stopTime.realtimeArrival}`}>
          <div className="Stop__box--name">
            {stopTime.trip.route.shortName}
          </div>
          <div className={classNames('Stop__box--time',
            {'Stop__box--small': !Number.isInteger(minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)) }
          )}>
              {minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)}
          </div>
        </div>
    )}
  </div>
)

export default Stop
