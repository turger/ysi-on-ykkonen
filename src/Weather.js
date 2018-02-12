import React, { Component } from 'react'
import Emoji from './Emoji'
import weatherEmojis from './weatherEmojis'
import './Weather.css'
import { getWeatherData } from './Requests'

const formatTime = timestamptxt => {
  console.log(timestamptxt)
  const time = timestamptxt.split(' ')[1].slice(0, -3);
  return time
}

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

  getCurrentWeatherData(weatherType) {
    getWeatherData().then(forecast => {
      this.setState({ forecast })
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
        <div className="Weather__item__time">{ formatTime(weather.dt_txt)}</div>
        <div className="Weather__item__temp">{ Math.round(weather.main.temp) }°</div>
        <Emoji name={ this.chooseIcon(Math.round(weather.main.temp), weather.weather[0].icon) }/>
      </div>
    )
  }

  render() {
    if (!this.state.forecast) return null
    const forecast = this.state.forecast
    console.log(forecast)
    return (
      <div className="Weather Weather__item">
         <div className="Weather__item">
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
