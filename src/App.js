import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import Stop from './Stop'
import Weather from './Weather'
import { getSchedulesForStop, getWeatherData } from './Requests'
import { StopIds } from './StopConfig'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewData: {},
      view: 0,
      viewCount: StopIds.length + 1,
    }
  }

  componentDidMount() {
    this.getWeatherData()
    this.getStopsData()
    setInterval(() => {
      let view = this.state.view === this.state.viewCount - 1 ? 0 : this.state.view + 1
      this.setState({ view })
    } , 2000)
    setInterval(() => {
      this.getStopsData()
    } , 60000)
    setInterval(() => {
      this.getWeatherData()
    } , 600000)
  }

  getStopsData() {
    let i = 1
    StopIds.map(stopId =>
      getSchedulesForStop(stopId).then(stopTimes => {
        let viewData = this.state.viewData
        viewData[i] = stopTimes
        this.setState({ viewData })
        i += 1
      })
    )
  }

  getWeatherData() {
    getWeatherData().then(weatherData => {
      let viewData = this.state.viewData
      viewData[0] = weatherData
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
