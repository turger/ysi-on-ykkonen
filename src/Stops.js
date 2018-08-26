import React, { Component } from 'react'
import _ from 'lodash'
import './Stops.css'
import Stop from './Stop'
import { getSchedulesForStop } from './Requests'
import { StopIds } from './StopConfig'

class Stops extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stopsData: {},
    }
  }

  componentDidMount() {
    this.getStopsData()
    setInterval(() => {
      this.getStopsData()
    } , 60000)
  }

  getStopsData() {
    Object.keys(StopIds).forEach(key => {
      if (StopIds[key].search(';')) {
        StopIds[key].split(';').forEach(stopId => this.getSchedules(stopId, key, {merge: true}))
      } else {
        this.getSchedules(StopIds[key], key, {merge: false})
      }
    })
  }

  getSchedules = (stopId, key, merge = false) => {
    getSchedulesForStop(stopId).then(stopTimes => {
      const stopsData = this.state.stopsData
      stopsData[key] = merge ? this.mergeStops(stopsData[key], stopTimes) : stopTimes
      this.setState({ stopsData })
    })
  }
  
  mergeStops = (currentStopTimes, newStopTimes) => {
    if (!currentStopTimes) return newStopTimes
    const mergedStopTimes = {}
    Object.keys(newStopTimes).forEach(key => {
      if(typeof newStopTimes[key] === 'string') {
        mergedStopTimes[key] = newStopTimes[key]
      } else {
        mergedStopTimes[key] = _.uniqWith(_.orderBy([...currentStopTimes[key], ...newStopTimes[key]], ['serviceDay', 'realtimeArrival']), _.isEqual)
      }
    })
    return mergedStopTimes
  }

  render() {
    if (!this.state.stopsData) return null
    const stops = this.state.stopsData
    return (
      <div className="Stops">
        { Object.keys(stops)
          .sort((a, b) => a > b)
          .map( key =>
            <div className="Stops__box" key={key}>
              <Stop stops={ stops[key].stoptimesWithoutPatterns } directions={stops[key].patterns}/>
            </div>
          )
        }
      </div>
    )
  }

}

export default Stops
