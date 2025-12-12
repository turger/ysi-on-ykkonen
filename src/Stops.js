import {useEffect, useState} from 'react'
import _ from 'lodash'
import Stop from './Stop'
import {getSchedulesForStop} from './requests'
import styles from './Stops.module.css'

const flattenStopTimes = (patterns) => {
  return patterns.map(pattern => pattern.stoptimes).flat().map(st => ({
    realtimeArrival: st.realtimeArrival,
    serviceDay: st.serviceDay,
    headsign: st.headsign,
    gtfsId: st.trip.route.gtfsId,
    longName: st.trip.route.longName,
    shortName: st.trip.route.shortName,
    mode: st.trip.route.mode
  }))
}

const parseFilters = () => {
  if (!process.env.REACT_APP_FILTER) return {}
  return process.env.REACT_APP_FILTER.split(',').reduce((acc, pair) => {
    const [key, value] = pair.split(':')
    if (key && value) {
      acc[key.trim()] = value.includes('+')
        ? value.split('+').map(v => v.trim())
        : [value.trim()]
    }
    return acc
  }, {})
}

const Stops = () => {
  const [stopsData, setStopsData] = useState([])
  const [schedules, setSchedules] = useState([])

  const fetchSchedules = async () => {
    const stopIdsList = process.env.REACT_APP_STOP_IDS?.split(',') || []
    const stopIds = stopIdsList.flatMap(stopId =>
      stopId.includes('+') ? stopId.split('+') : stopId
    )

    const schedulesData = await Promise.all(
      stopIds.map(stopId => getSchedulesForStop(stopId))
    )
    setSchedules(schedulesData.filter(Boolean))
  }

  useEffect(() => {
    fetchSchedules()
    const interval = setInterval(fetchSchedules, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (_.isEmpty(schedules)) return

    const stopIdsList = process.env.REACT_APP_STOP_IDS?.split(',') || []
    const filters = parseFilters()

    const processedStops = stopIdsList.map((stopId, i) => {
      const stopIds = stopId.includes('+') ? stopId.split('+') : [stopId]
      const foundSchedules = stopIds
        .map(id => schedules.find(s => s.gtfsId === id))
        .filter(Boolean)

      if (_.isEmpty(foundSchedules)) return null

      const allPatterns = foundSchedules.flatMap(s => s.stoptimesForPatterns)
      const flatStopTimes = _.orderBy(
        flattenStopTimes(allPatterns),
        ['serviceDay', 'realtimeArrival']
      )

      const filterValue = filters[i]
      const filteredTimes = filterValue
        ? flatStopTimes.filter(st => filterValue.includes(st.shortName))
        : flatStopTimes

      return {
        name: foundSchedules.map(s => s.name).join(';'),
        flatStopTimes: filteredTimes
      }
    }).filter(Boolean)

    setStopsData(processedStops)
  }, [schedules])

  if (_.isEmpty(stopsData)) return null

  return (
    <div className={styles.Stops}>
      {stopsData.map((stop, i) => (
        <div className={styles.Box} key={i}>
          <Stop stops={stop.flatStopTimes} />
        </div>
      ))}
    </div>
  )
}

export default Stops
