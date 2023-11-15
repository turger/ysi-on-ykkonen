import _ from 'lodash'
import React from 'react'
import classNames from 'classnames'
import { extensionConnectionSuitable, minutesToDeparture } from './utils/utils'
import Vehicle from './Vehicle'
import styles from './Stop.module.css'

const Stop = ({stops, directions, extensionConnection}) => (
  <div className={styles.Stop}>
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
          <div className={styles.Route} key={`${stopTime.trip.route.gtfsId}-${stopTime.realtimeArrival}`}>
            <Vehicle mode={ stopTime.trip.route.mode }/>
            <div className={classNames(styles.RouteNumber, {[styles.ExtensionConnection]: suitableForExtensionConnection})}>
              {stopTime.trip.route.shortName}
            </div>
            <div className={styles.Headsign}>
              {directions.find(direction => direction.route.shortName === stopTime.trip.route.shortName).headsign}
            </div>
            <div className={styles.Time}>
                { timeToDeparture }
            </div>
          </div>
        )
      }
    )}
  </div>
)

export default Stop
