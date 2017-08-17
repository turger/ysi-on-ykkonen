import React, { Component } from 'react'
import Emoji from './Emoji'
import classNames from 'classnames'
import weatherEmojis from './weatherEmojis'
import './Weather.css'
import { getWeatherData } from './Requests'

const formatDay = timestamp => {
  const datetime = new Date(timestamp*1000)
  const day = datetime.getDate()
  const month = datetime.getMonth()+1
  return `${day}.${month}.`
}

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
      weatherData: null,
    }
  }

  componentDidMount() {
    this.getCurrentWeatherData(this.props.type)
    setInterval(() => {
      this.getCurrentWeatherData()
    } , 600000)
  }

  getCurrentWeatherData(weatherType) {
    getWeatherData(weatherType).then(weatherData => {
      this.setState({ weatherData })
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

  render() {
    const weatherType = this.props.type
    if (!this.state.weatherData) return null
    const weatherData = this.state.weatherData
    console.log('Weather', weatherData, weatherType)
    return (
      <div className={classNames('Weather',
        {'Weather--small': weatherType === 'current',
        'Weather--big': weatherType === '5days'}
      )}>
      { weatherType === 'current' &&
          <div className="Weather__current">
            { weatherData.main.temp }°
            <Emoji name={ this.chooseIcon(weatherData.main.temp, weatherData.weather[0].icon) }/>
          </div>
       }
       { weatherType === '5days' &&
           <div className="Weather__5days">
             { weatherData.list
                .slice(0, 8)
                .map(weather =>
                  <div className="Weather__5days__box" key={weather.dt}>
                    <div className="Weather__5days__day">{formatDay(weather.dt)}</div>
                    <div className="Weather__5days__time">{formatTime(weather.dt)}</div>
                    <div className="Weather__5days__temp">{ Math.round(weather.main.temp) }°</div>
                    <Emoji name={ this.chooseIcon(Math.round(weather.main.temp), weather.weather[0].icon) }/>
                  </div>
               )
             }
           </div>
        }
       </div>
    )
  }

}

export default Weather
