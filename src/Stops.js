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
    Object.keys(StopIds).forEach(i => {
      if (StopIds[i].includes(';')) {
        StopIds[i].split(';').forEach(stopId => this.getSchedules(stopId, i, {merge: true}))
      } else {
        this.getSchedules(StopIds[i], i)
      }
    })
  }

  getSchedules = (stopId, i, {merge = false} = {}) => {
    getSchedulesForStop(stopId).then(stopTimes => {
      const stopsData = this.state.stopsData
      stopsData[i] = merge ? this.mergeStops(stopsData[i], stopTimes) : stopTimes
      this.setState({ stopsData })
    })
  }
  
  mergeStops = (currentStopTimes, newStopTimes) => {
    if (!currentStopTimes) return newStopTimes
    if (currentStopTimes['gtfsId'].includes(newStopTimes['gtfsId'])) return newStopTimes
    const mergedStopTimes = {}
    Object.keys(newStopTimes).forEach(i => {
      if(typeof newStopTimes[i] === 'string') {
        mergedStopTimes[i] = `${newStopTimes[i]};${currentStopTimes[i]}`
      } else {
        mergedStopTimes[i] = _.orderBy([...currentStopTimes[i], ...newStopTimes[i]], ['serviceDay', 'realtimeArrival'])
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
