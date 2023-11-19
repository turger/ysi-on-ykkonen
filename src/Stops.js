import React, {useEffect, useState} from 'react'
import _ from 'lodash'
import Stop from './Stop'
import {getSchedulesForStop, getExtensionConnection} from './requests'
import styles from './Stops.module.css'

const getExtensionConnectionSchedules = async () => {
  const stopId = process.env.REACT_APP_EXTENSION_CONNECTION_STOP
  const patternId = process.env.REACT_APP_EXTENSION_CONNECTION_PATTERN
  return getExtensionConnection(stopId, patternId)
}

const Stops = () => {
  const [stopsData, setStopsData] = useState({})
  const [schedules, setSchedules] = useState([])
  const [extensionConnections, setExtensionConnections] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const getSchedulesForStops = async () => {
    const stopIdsList = process.env.REACT_APP_STOP_IDS ? process.env.REACT_APP_STOP_IDS.split(',') : []
    const stopIds = stopIdsList.map(stopId => {
      // If there's actually many stops to be merged in one spot
      if (stopId.includes('+')) {
        return stopId.split('+')
      }
      return stopId
    }).flat()

    const extensionConnectionPromises = stopIds.map(stopId => {
      const connFor = process.env.REACT_APP_EXTENSION_CONNECTION_FOR_STOP
      if (_.isEqual(stopId, connFor)) {
        return getExtensionConnectionSchedules()
      }
    }).filter(promise => promise)

    const extensionConnectionData = await Promise.all(extensionConnectionPromises)
    if (extensionConnectionData) {
      setExtensionConnections(extensionConnectionData)
    }

    const schedulePromises = stopIds.map(stopId => getSchedulesForStop(stopId))
      .filter(schedule => schedule)
    const schedulesData = await Promise.all(schedulePromises)
    if (schedulesData) {
      setSchedules(schedulesData.filter(schedule => schedule))
    }
  }

  useEffect(() => {
    const getSchedules = async () => {
      await getSchedulesForStops()
    }

    getSchedules()

    const interval = setInterval(() => {
      getSchedules()
    }, 60000) // 60000 = 1 min

    return () => {
      clearInterval(interval)
    }
  }, [])

  const getExtensionConnectionForStop = (stopId) => {
    const connForStopId = process.env.REACT_APP_EXTENSION_CONNECTION_FOR_STOP
    const connStopId = process.env.REACT_APP_EXTENSION_CONNECTION_STOP
    if (_.isEqual(stopId, connForStopId)) {
      const connectionData = extensionConnections.find(connection => connection.gtfsId === connStopId)

      if (!_.isEmpty(connectionData)) {
        return connectionData.stopTimesForPattern
      }
    }
    return undefined
  }

  const getStopsData = () => {
    const stopIdsLists = process.env.REACT_APP_STOP_IDS ? process.env.REACT_APP_STOP_IDS.split(',') : []
    if (_.isEmpty(stopIdsLists)) setErrorMessage('No stops found!')
    return stopIdsLists.map((stopId, i) => {
      if (stopId.includes('+')) {
        // There's actually many stops to be merged in one spot
        const stopIds = stopId.split('+')
        const schedulesToMerge = stopIds.map(stopId => schedules.find(schedule => schedule.gtfsId === stopId)).filter(sched => sched)

        if (_.isEmpty(schedulesToMerge)) return null

        const stopTimes = schedulesToMerge.map(schedule => schedule.stoptimesWithoutPatterns).flat()
        const orderedStopTimes = _.orderBy(stopTimes, ['serviceDay', 'realtimeArrival'])
        // Return merged
        return {
          name: schedulesToMerge.map(schedule => schedule.name).join(';'),
          gtfsId: schedulesToMerge.map(schedule => schedule.gtfsId).join(';'),
          patterns: schedulesToMerge.map(schedule => schedule.patterns).flat(),
          stoptimesWithoutPatterns: orderedStopTimes,
          extensionConnection: schedulesToMerge
            .map(schedule => getExtensionConnectionForStop(schedule.gtfsId))
            .flat()
            .filter(connection => connection)
        }
      } else {
        const scheds = schedules.find(schedule => schedule.gtfsId === stopId)
        scheds['extensionConnection'] = getExtensionConnectionForStop(stopId)
        return scheds
      }
    })
  }

  useEffect(() => {
    if (_.isEmpty(schedules)) return

    const stopsData = getStopsData()
    setStopsData(stopsData)
  }, [schedules, extensionConnections])

  if (!stopsData) return null

  return (<div className={styles.Stops}>
    {errorMessage && <div>{errorMessage}</div>}
    {Object.keys(stopsData)
      .sort((a, b) => a > b)
      .map(key => <div className={styles.Box} key={key}>
        {stopsData[key] && <Stop stops={stopsData[key].stoptimesWithoutPatterns} directions={stopsData[key].patterns}
                                 extensionConnection={stopsData[key].extensionConnection}/>}
      </div>)}
  </div>)

}

export default Stops
