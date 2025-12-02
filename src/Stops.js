import React, {useEffect, useState} from 'react'
import _ from 'lodash'
import Stop from './Stop'
import {getSchedulesForStop} from './requests'
import styles from './Stops.module.css'

const Stops = () => {
  const [stopsData, setStopsData] = useState({})
  const [schedules, setSchedules] = useState([])
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

  const getStopsData = () => {
    const stopIdsLists = process.env.REACT_APP_STOP_IDS ? process.env.REACT_APP_STOP_IDS.split(',') : []
    if (_.isEmpty(stopIdsLists)) setErrorMessage('No stops found!')
    return stopIdsLists.map((stopId, i) => {
      if (stopId.includes('+')) {
        // There's actually many stops to be merged in one spot
        const stopIds = stopId.split('+')
        const schedulesToMerge = stopIds.map(stopId => schedules.find(schedule => schedule.gtfsId === stopId)).filter(sched => sched)

        if (_.isEmpty(schedulesToMerge)) return null

        const stopTimes = schedulesToMerge.map(schedule => schedule.stoptimesForPatterns).flat()
        const flatStopTimes = flattenStopTimes(stopTimes)
        const orderedStopTimes = _.orderBy(flatStopTimes, ['serviceDay', 'realtimeArrival'])
        return {
          name: schedulesToMerge.map(schedule => schedule.name).join(';'),
          flatStopTimes: orderedStopTimes
        }
      } else {
        const scheds = schedules.find(schedule => schedule.gtfsId === stopId)
        if (!scheds) return null

        const flatStopTimes = flattenStopTimes(scheds.stoptimesForPatterns)
        const orderedStopTimes = _.orderBy(flatStopTimes, ['serviceDay', 'realtimeArrival'])

        return {
          name: scheds.name,
          flatStopTimes: orderedStopTimes
        }
      }
    })
  }

  const filterStopsData = (stopsData) => {
    // example REACT_APP_FILTER=1:56,2:6
    // Split the filter string into key-object pairs: e.g. { 1: "56", 2: "6" }
    const filters = process.env.REACT_APP_FILTER
      ? process.env.REACT_APP_FILTER.split(',').reduce((acc, pair) => {
        const [key, value] = pair.split(':');
        if (key && value) acc[key.trim()] = value.trim();
        return acc;
      }, {})
      : {};

    const filteredStopsData = stopsData.map((stop, i) => {
      // If index i is in filters, add a 'filter' key to the stop object
      const filterValue = filters[i];
      if (filterValue !== undefined) {
        return {...stop, flatStopTimes: stop?.flatStopTimes?.filter(stopTime => stopTime.shortName === filterValue) || []};
      }
      return stop;
    });

    return filteredStopsData;
  }

  useEffect(() => {
    if (_.isEmpty(schedules)) return

    const stopsData = getStopsData()
    const filteredStopsData = filterStopsData(stopsData)
    setStopsData(filteredStopsData)
  }, [schedules])

  if (!stopsData) return null

  return (<div className={styles.Stops}>
    {errorMessage && <div>{errorMessage}</div>}
    {Object.keys(stopsData)
      .sort((a, b) => a > b)
      .map(key => <div className={styles.Box} key={key}>
        {stopsData[key] && <Stop stops={stopsData[key].flatStopTimes} />}
      </div>)}
  </div>)

}

export default Stops
