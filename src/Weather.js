import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Arrow from './assets/up-arrow.svg'
import { getYRWeatherData } from './requests'
import { formatTime } from './utils/utils'
import { ReactSVG } from 'react-svg'
import YrWeatherIcon from './YrWeatherIcon'
import styles from './Weather.module.css'

const Weather = ({ setUmbrella }) => {
  const [yrForecast, setYrForecast] = useState(null)

  const windexes = useRef({})

  useEffect(() => {
    getCurrentWeatherData()
    setInterval(() => {
      getCurrentWeatherData()
    }, 600000)
  }, [])

  useEffect(() => {
    Object.keys(windexes).forEach((i) => {
      const windex = windexes[i]
      windex.obj && windex.obj.style.setProperty("--deg", windex.direction)
    })
  }, [yrForecast])

  const getCurrentWeatherData = () => {
    getYRWeatherData().then((data) => {
      setYrForecast(JSON.parse(data))
      checkUmbrellaNeed(JSON.parse(data))
    })
  }

  const checkUmbrellaNeed = (data) => {
    const timeseries = _.get(data, "properties.timeseries")
    const rainsWithin12Hours = timeseries.slice(0, 12).map((weather) => {
      const symbol = _.get(weather, "data.next_1_hours.summary.symbol_code")
      return symbol.toLowerCase().includes("rain")
    })
    setUmbrella(rainsWithin12Hours.includes(true))
  }

  const renderWeatherItem = (weather) => {
    const details = _.get(weather, "data.instant.details")
    const key = weather.time
    const symbol = _.get(weather, "data.next_1_hours.summary.symbol_code")
    const raining = symbol.toLowerCase().includes("rain")
    return (
      <div className={styles.WeatherBox} key={key}>
        <div className={styles.Time}>{formatTime(weather.time)}</div>
        <div className={classNames(styles.Temp, { [styles.Raining]: raining })}>
          {Math.round(details.air_temperature)}°
        </div>
        <YrWeatherIcon name={symbol} />
        <div
          className={styles.Wind}
          key={key}
          ref={(c) =>
          (windexes[key] = {
            direction: `${details.wind_from_direction}deg` || "0deg",
            obj: c,
          })
          }
        >
          <div className={styles.WindMS}>
            {Math.round(details.wind_speed)}
          </div>
          <ReactSVG src={Arrow} className={styles.DirectionArrow} />
        </div>
      </div>
    )
  }

  if (!yrForecast) return null
  const timeseries = _.get(yrForecast, "properties.timeseries")
  return (
    <div className={styles.Weather}>
      <div className={styles.WeatherItem}>
        {timeseries
          .filter((w, key) => key % 3 === 0)
          .slice(0, 8)
          .map((weather) => renderWeatherItem(weather))}
      </div>
    </div>
  )
}

Weather.propTypes = {
  setUmbrella: PropTypes.func,
}

export default Weather
