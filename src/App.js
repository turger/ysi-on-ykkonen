import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import Stop from './Stop'
import Weather from './Weather'
import { getSchedulesForStop, getWeatherData } from './Requests'

const PK_STOP_ID = 'HSL:1220127'
const VV_STOP_ID = 'HSL:1220411'
const HT_STOP_ID = 'HSL:1220416'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewData: {},
      view: 0,
    }
  }

  componentDidMount() {
    this.getData()
    this.getWeatherData(3)
    setInterval(() => {
      let view = this.state.view === 3 ? 0 : this.state.view + 1
      this.setState({ view })
    } , 2000)
    setInterval(() => {
      this.getData()
    } , 60000)
    setInterval(() => {
      this.getWeatherData(3)
    } , 600000)
  }

  getData() {
    this.getDataForStop(PK_STOP_ID, 0)
    this.getDataForStop(VV_STOP_ID, 1)
    this.getDataForStop(HT_STOP_ID, 2)
  }

  getDataForStop(stopId, viewId) {
    getSchedulesForStop(stopId).then(stopTimes => {
      let viewData = this.state.viewData
      viewData[viewId] = stopTimes
      this.setState({ viewData })
    })
  }

  getWeatherData(viewId) {
    getWeatherData().then(weatherData => {
      let viewData = this.state.viewData
      viewData[viewId] = weatherData
      this.setState({ viewData })
    })
  }

  render() {
    if (!this.state.viewData[this.state.view]) return null
    const data = this.state.viewData[this.state.view]
    return (
      <div className="App" >
        { data.stoptimesWithoutPatterns &&
          <div>
            <Header stopName={data.name} view={this.state.view}/>
            <Stop stops={data.stoptimesWithoutPatterns}/>
          </div>
        }
        { data.weather &&
          <Weather weatherData={ data }/>
        }
      </div>
    )
  }

}

export default App
