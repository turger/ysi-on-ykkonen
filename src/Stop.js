import _ from 'lodash'
import React from 'react'
import classNames from 'classnames'
import './Stop.css'
import { extensionConnectionSuitable, minutesToDeparture } from './utils/utils'
import Vehicle from './Vehicle'

const Stop = ({stops, directions, extensionConnection}) => (
  <div className="Stop">
    {stops
      .filter(stopTime => {
        const timeToDeparture = minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)
        return(!Number.isInteger(timeToDeparture) || timeToDeparture >= 3)}
      )
      .slice(0, 3)
      .map(stopTime => {
        const timeToDeparture = minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)
        const suitableForExtensionConnection = extensionConnectionSuitable(extensionConnection, timeToDeparture)
        return(
          <div className="Stop__route" key={`${stopTime.trip.route.gtfsId}-${stopTime.realtimeArrival}`}>
            <Vehicle mode={ stopTime.trip.route.mode }/>
            <div className={classNames("Stop__route--number", {"Stop__route--number--extension": suitableForExtensionConnection})}>
              {stopTime.trip.route.shortName}
            </div>
            <div className="Stop__route--headsign">
              {directions.find(direction => direction.route.shortName === stopTime.trip.route.shortName).headsign}
            </div>
            <div className="Stop__route--time">
                { timeToDeparture }
            </div>
          </div>
        )
      }
    )}
  </div>
)

export default Stop
