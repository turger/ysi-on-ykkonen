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
      datetime: null,
    }
  }

  componentDidMount() {
    this.getWeatherData()
    this.getStopsData()
    this.setTime()
    setInterval(() => {
      this.getStopsData()
    } , 60000)
    setInterval(() => {
      this.getWeatherData()
    } , 600000)
    setInterval(() => {
      this.setTime()
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

  setTime() {
    this.setState({ datetime: new Date() })
  }

  render() {
    console.log(this.state.datetime)
    if (!this.state.weatherData || !this.state.stopsData || !this.state.datetime) return null
    return (
      <div className="App" >
        <div className="App_leftcolumn">
          <Time datetime={ this.state.datetime }/>
          <Weather weatherData={ this.state.weatherData }/>
        </div>
        <Stops stops={ this.state.stopsData }/>
      </div>
    )
  }

}

export default App
