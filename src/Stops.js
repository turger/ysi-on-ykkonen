import React, { Component } from 'react'
import _ from 'lodash'
import Stop from './Stop'
import { getSchedulesForStop, getExtensionConnection } from './requests'
import styles from './Stops.module.css'

class Stops extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stopsData: {},
      errorMessage: null,
    }
  }

  componentDidMount() {
    this.getStopsData()
    setInterval(() => {
      this.getStopsData()
    }, 60000)
  }

  getStopsData() {
    const stopIds = process.env.REACT_APP_STOP_IDS ? process.env.REACT_APP_STOP_IDS.split(',') : []
    if (_.isEmpty(stopIds)) this.setState({ errorMessage: 'No stops found!' })
    stopIds.forEach((stopId, i) => {
      if (stopId.includes('-')) {
        // There's actually many stops to be merged in one spot
        stopId.split('-').forEach(stopId => this.getSchedules(stopId, i, { merge: true }))
      } else {
        this.getSchedules(stopId, i)
      }
    })
  }

  getExtensionConnectionSchedules = async () => {
    const stopId = process.env.REACT_APP_EXTENSION_CONNECTION_STOP
    const patternId = process.env.REACT_APP_EXTENSION_CONNECTION_PATTERN
    return getExtensionConnection(stopId, patternId)
  }

  getSchedules = async (stopId, i, { merge = false } = {}) => {
    const connFor = process.env.REACT_APP_EXTENSION_CONNECTION_FOR_STOP
    let connectionData
    if (_.isEqual(stopId, connFor)) {
      connectionData = await this.getExtensionConnectionSchedules()
    }

    getSchedulesForStop(stopId).then(stopTimes => {
      const stopsData = this.state.stopsData
      stopsData[i] = merge ? this.mergeStops(stopsData[i], stopTimes) : stopTimes
      if (!_.isEmpty(connectionData)) {
        stopsData[i]['extensionConnection'] = connectionData.stopTimesForPattern
      }
      this.setState({ stopsData })
    })
  }

  mergeStops = (currentStopTimes, newStopTimes) => {
    if (!currentStopTimes || _.isEmpty(newStopTimes)) return newStopTimes
    if (_.get(currentStopTimes, 'gtfsId').includes(_.get(newStopTimes, 'gtfsId'))) return newStopTimes
    const mergedStopTimes = {}
    Object.keys(newStopTimes).forEach(i => {
      if (typeof newStopTimes[i] === 'string') {
        mergedStopTimes[i] = `${newStopTimes[i]};${currentStopTimes[i]}`
      } else {
        mergedStopTimes[i] = _.orderBy([...currentStopTimes[i], ...newStopTimes[i]], ['serviceDay', 'realtimeArrival'])
      }
    })
    return mergedStopTimes
  }

  render() {
    const { stopsData, errorMessage } = this.state
    if (!stopsData) return null
    return (
      <div className={styles.Stops}>
        {errorMessage && <div>{errorMessage}</div>}
        {Object.keys(stopsData)
          .sort((a, b) => a > b)
          .map(key =>
            <div className={styles.Box} key={key}>
              {stopsData[key] &&
                <Stop stops={stopsData[key].stoptimesWithoutPatterns} directions={stopsData[key].patterns} extensionConnection={stopsData[key].extensionConnection} />
              }
            </div>
          )
        }
      </div>
    )
  }

}

export default Stops
