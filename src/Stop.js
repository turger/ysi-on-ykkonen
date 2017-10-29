import React from 'react'
import classNames from 'classnames'
import './Stop.css'
import { minutesToDeparture } from './utils/utils'

const Stop = ({stops}) => (
  <div className="Stop">
    {stops
      .filter(stopTime => {
        const timeToDeparture = minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)
        return(!Number.isInteger(timeToDeparture) ||timeToDeparture > 4)}
      )
      .slice(0, 2)
      .map(stopTime => {
        const timeToDeparture = minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)
        return(
          <div className="Stop__box" key={`${stopTime.trip.route.gtfsId}-${stopTime.realtimeArrival}`}>
            <div className="Stop__box--name">
              {stopTime.trip.route.shortName}
            </div>
            <div className={classNames('Stop__box--time',
              {'Stop__box--small': !Number.isInteger(timeToDeparture) }
            )}>
                { timeToDeparture }
            </div>
          </div>
        )
      }
    )}
  </div>
)

export default Stop
