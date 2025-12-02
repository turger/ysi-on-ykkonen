import {minutesToDeparture} from './utils/utils'
import Vehicle from './Vehicle'
import styles from './Stop.module.css'

const Stop = ({stops}) => {
  const displayCount = process.env.REACT_APP_IS_PI === 'true' ? 3 : 4

  const filteredStops = stops
    .filter(stopTime => {
      const timeToDeparture = minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)
      return !Number.isInteger(timeToDeparture) || timeToDeparture >= 1
    })
    .slice(0, displayCount)

  return (
    <div className={styles.Stop}>
      {filteredStops.map(stopTime => {
        const timeToDeparture = minutesToDeparture(stopTime.realtimeArrival, stopTime.serviceDay)
        return (
          <div className={styles.Route} key={`${stopTime.gtfsId}-${stopTime.realtimeArrival}`}>
            <Vehicle mode={stopTime.mode} />
            <div className={styles.RouteNumber}>{stopTime.shortName}</div>
            <div className={styles.Headsign}>{stopTime.headsign}</div>
            <div className={styles.Time}>{timeToDeparture}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Stop
