import React, { Component } from 'react'
import './App.css'
import Stops from './Stops'
import Weather from './Weather'
import Time from './Time'
import { getSchedulesForStop, getWeatherData } from './Requests'
import { StopIds } from './StopConfig'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherData: null,
      stopsData: {},
      time: null,
    }
  }

  componentDidMount() {
    this.getWeatherData()
    this.getStopsData()
    this.getTime()
    setInterval(() => {
      this.getStopsData()
    } , 60000)
    setInterval(() => {
      this.getWeatherData()
    } , 600000)
    setInterval(() => {
      this.getTime()
    } , 1000)
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

  getWeatherData() {
    getWeatherData().then(weatherData => {
      this.setState({ weatherData })
    })
  }

  getTime() {
    const currentdate = new Date()
    const hours = currentdate.getUTCHours()
    const minutes = currentdate.getUTCMinutes()
    const time = hours + ':' + minutes
    this.setState({ time })
  }

  render() {
    if (!this.state.weatherData || !this.state.stopsData) return null
    return (
      <div className="App" >
        <div className="App_leftcolumn">
          <Time time={ this.state.time }/>
          <Weather weatherData={ this.state.weatherData }/>
        </div>
        <Stops stops={ this.state.stopsData }/>
      </div>
    )
  }

}

export default App
