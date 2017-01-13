import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import Stop from './Stop'
import { getSchedulesForStop } from './Requests'
import NearestStops from './NearestStops'

const STOP_ID = 'HSL:1203406'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stopTimes: [],
      stoptimesWithoutPatterns: [],
    }

    getSchedulesForStop(STOP_ID).then(stopTimes => {
      this.setState({
        stopTimes: stopTimes,
        stoptimesWithoutPatterns: stopTimes.stoptimesWithoutPatterns
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Header stopName={this.state.stopTimes.name}/>
        <Stop stops={this.state.stoptimesWithoutPatterns}/>
        <NearestStops/>
      </div>
    )
  }

}

export default App
