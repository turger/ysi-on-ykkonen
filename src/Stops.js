import React, { Component } from 'react'
import './Stops.css'
import Stop from './Stop'
import Emoji from './Emoji'
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
    Object.keys(StopIds).map(key =>
      getSchedulesForStop(StopIds[key]).then(stopTimes => {
        let stopsData = this.state.stopsData
        stopsData[key] = stopTimes
        this.setState({ stopsData })
      })
    )
  }

  render() {
    console.log('Stops', this.state.stopsData)
    if (!this.state.stopsData) return null
    const stops = this.state.stopsData
    return (
      <div className="Stops">
        { Object.keys(stops)
          .sort((a, b) => a > b)
          .map( key =>
          <div className="Stops__times" key={key}>
            <Emoji name={ ':' + key + ':' }/>
            <Stop stops={ stops[key].stoptimesWithoutPatterns }/>
          </div>
          )
        }
      </div>
    )
  }

}

export default Stops
