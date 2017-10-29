import React, { Component } from 'react'
import Emoji from './Emoji'
import weatherEmojis from './weatherEmojis'
import './Weather.css'
import { getWeatherData } from './Requests'

const formatTime = timestamp => {
  const datetime = new Date(timestamp*1000)
  const hours = datetime.getHours()
  const minutes = ('0' + datetime.getMinutes()).slice(-2)
  return `${hours}:${minutes}`
}

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forecast: null,
      currentWeather: null
    }
  }

  componentDidMount() {
    this.getCurrentWeatherData(this.props.type)
    setInterval(() => {
      this.getCurrentWeatherData()
    } , 600000)
  }

  getCurrentWeatherData(weatherType) {
    getWeatherData('5days').then(forecast => {
      this.setState({ forecast })
      getWeatherData('current').then(currentWeather => {
        this.setState({ currentWeather })
      })
    })
  }


  chooseIcon(temp, icon) {
    if (temp > 20 && (icon === '01d' || icon === '01n')) {
      return ":fire:"
    } else if (temp <= -10 && (icon === '13d' || icon === '13n')) {
      return ":snowman2:"
    } else {
      return weatherEmojis[icon]
    }
  }

  renderWeatherItem(weather) {
    return (
      <div className="Weather__item__box" key={weather.dt}>
        <div className="Weather__item__time">{formatTime(weather.dt)}</div>
        <div className="Weather__item__temp">{ Math.round(weather.main.temp) }°</div>
        <Emoji name={ this.chooseIcon(Math.round(weather.main.temp), weather.weather[0].icon) }/>
      </div>
    )
  }

  render() {
    if (!this.state.forecast || !this.state.currentWeather) return null
    const forecast = this.state.forecast
    const currentWeather = this.state.currentWeather
    return (
      <div className="Weather Weather__item">
         <div className="Weather__item">
          { this.renderWeatherItem(currentWeather) }
           { forecast.list
              .slice(0, 7)
              .map(weather => this.renderWeatherItem(weather))
           }
         </div>
       </div>
    )
  }

}

export default Weather
