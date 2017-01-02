import React, { Component } from 'react'
import './App.css'
import { getSchedulesForStop } from './Requests.js'

const STOP_ID = 'HSL:1203406'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stopTimes: []
    }

    getSchedulesForStop(STOP_ID, 1483362409).then(stopTimes => {
      this.setState({
        stopTimes: stopTimes.stoptimesWithoutPatterns
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>HUUTOKONTTORI</h2>
        </div>
        <ul>
          {this.state.stopTimes.map(stopTime =>
            <li
              key={`${stopTime.trip.route.gtfsId}-${stopTime.scheduledArrival}`}
            >
              {`${stopTime.trip.route.gtfsId}-${stopTime.scheduledArrival}`}
            </li>
          )}
        </ul>
      </div>
    )
  }

}

export default App
