import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import Stop from './Stop'
import { getSchedulesForStop } from './Requests'

const PK_STOP_ID = 'HSL:1220127'
const VV_STOP_ID = 'HSL:1220411'
const HT_STOP_ID = 'HSL:1220416'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stopsAndTimes: {},
      view: 0,
    }

    this.getStopsData()
  }

  componentDidMount() {
    setInterval(() => {
      let view = this.state.view === 2 ? 0 : this.state.view + 1
      this.setState({ view })
    } , 2000)
    setInterval(() => {
      this.getStopsData()
    } , 60000)
  }

  getStopsData() {
    this.getDataForStop(PK_STOP_ID, 0)
    this.getDataForStop(VV_STOP_ID, 1)
    this.getDataForStop(HT_STOP_ID, 2)
  }

  getDataForStop(stopId, viewId) {
    getSchedulesForStop(stopId).then(stopTimes => {
      let stopsAndTimes = this.state.stopsAndTimes
      stopsAndTimes[viewId] = stopTimes
      this.setState({ stopsAndTimes })
    })
  }

  render() {
    if (!this.state.stopsAndTimes[this.state.view]) return null
    const stop = this.state.stopsAndTimes[this.state.view]
    return (
      <div className="App" >
        <Header stopName={stop.name} view={this.state.view}/>
        <Stop stops={stop.stoptimesWithoutPatterns}/>
      </div>
    )
  }

}

export default App
