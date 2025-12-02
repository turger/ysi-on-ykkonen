import _ from 'lodash'
import {minutesToDeparture} from './utils/utils'
import Vehicle from './Vehicle'
import styles from './Stop.module.css'

const Stop = ({stops}) => {
  return (
    <div className={styles.Stop}>
      {stops
        .filter(stopTime => {
          const timeToDeparture = minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)
          return (!Number.isInteger(timeToDeparture) || timeToDeparture >= 1)
        })
        .slice(0, process.env.IS_PI ? 3 : 4)
        .map(stopTime => {
          const timeToDeparture = minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)
          const routeShortName = stopTime.shortName
          return (
            <div className={styles.Route} key={`${stopTime.gtfsId}-${stopTime.realtimeArrival}`}>
              <Vehicle mode={stopTime.mode} />
              <div className={styles.RouteNumber}>
                {routeShortName}
              </div>
              <div className={styles.Headsign}>
                {stopTime.headsign}
              </div>
              <div className={styles.Time}>
                {timeToDeparture}
              </div>
            </div>
          )
        }
        )}
    </div>
  )
}

export default Stop
