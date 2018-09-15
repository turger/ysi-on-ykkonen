import React, { Component } from 'react'
import Emoji from './Emoji'
import weatherEmojis from './weatherEmojis'
import './Weather.css'
import { getFmiWeatherData } from './Requests'
import { parseXmlWeatherData, formatTime } from './utils/utils'

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forecast: null,
    }
  }

  componentDidMount() {
    this.getCurrentWeatherData()
    setInterval(() => {
      this.getCurrentWeatherData()
    } , 600000)
  }

  getCurrentWeatherData() {
    getFmiWeatherData()
      .then(data => {
        parseXmlWeatherData(data)
          .then(forecast => {
            this.setState({ forecast })
          })
      })
  }


  chooseIcon(temp, icon) {
    if (temp > 20 && icon === 1) {
      return ":fire:"
    } else if (temp <= -10 && icon >= 41 && icon <= 53) {
      return ":snowman2:"
    } else {
      return weatherEmojis[icon]
    }
  }

  renderWeatherItem(weather) {
    return (
      <div className="Weather__item__box" key={weather.time}>
        <div className="Weather__item__time">{ formatTime(weather.time)}</div>
        <div className="Weather__item__temp">{ Math.round(weather.temperature) }°</div>
        <Emoji name={ this.chooseIcon(Math.round(weather.temperature), weather.weathersymbol3) }/>
      </div>
    )
  }

  render() {
    const forecast = this.state.forecast
    if (!forecast) return null
    return (
      <div className="Weather">
         <div className="Weather__item">
           { forecast
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
