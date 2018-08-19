import React, { Component } from 'react'
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
    Object.keys(StopIds).map(key =>
      getSchedulesForStop(StopIds[key]).then(stopTimes => {
        let stopsData = this.state.stopsData
        stopsData[key] = stopTimes
        this.setState({ stopsData })
      })
    )
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
            <div className="Stops__box__name">
              { stops[key].name }
            </div>
            <Stop stops={ stops[key].stoptimesWithoutPatterns } directions={stops[key].patterns}/>
          </div>
          )
        }
      </div>
    )
  }

}

export default Stops
