import React, { Component } from 'react'
import Arrow from './assets/up-arrow.svg'
import './Weather.css'
import { getYRWeatherData } from './Requests'
import {formatTime} from './utils/utils'
import {ReactSVG} from 'react-svg'
import YrWeatherIcon from './YrWeatherIcon'

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yrforecast: null
    }
    this._windexes = {}
  }

  componentDidMount() {
    this.getCurrentWeatherData()
    setInterval(() => {
      this.getCurrentWeatherData()
    } , 600000)
  }

  componentDidUpdate() {
    Object.keys(this._windexes).forEach(i => {
      const windex = this._windexes[i]
      windex.obj && windex.obj.style.setProperty('--deg', windex.direction)
    })
  }

  getCurrentWeatherData() {
    getYRWeatherData()
      .then(data => {
        this.setState({ yrforecast: JSON.parse(data) })
      })
  }

  renderWeatherItem(weather) {
    const details = _.get(weather, 'data.instant.details')
    const key = weather.time
    const symbol = _.get(weather, 'data.next_1_hours.summary.symbol_code')
    return (
      <div className="Weather__item__box" key={key}>
        <div className="Weather__item__time">{ formatTime(weather.time)}</div>
        <div className="Weather__item__temp">{ Math.round(details.air_temperature) }°</div>
        <YrWeatherIcon name={symbol} />
        <div className="Weather__item__wind" key={key} ref={c => (this._windexes[key] = {direction: `${details.wind_from_direction}deg` || '0deg', obj: c})}>
          <div className="Weather__item__wind__ms">{ Math.round(details.wind_speed) }</div>
          <ReactSVG
            src={Arrow}
            className="Direction__arrow"
          />
        </div>
      </div>
    )
  }

  render() {
    const {yrforecast} = this.state
    if (!yrforecast) return null
    const timeseries = _.get(yrforecast, 'properties.timeseries')
    return (
      <div className="Weather">
         <div className="Weather__item">
           { timeseries
              .filter((w, key) => key % 3 === 0)
              .slice(0, 8)
              .map(weather => this.renderWeatherItem(weather))
           }
         </div>
       </div>
    )
  }

}

export default Weather
