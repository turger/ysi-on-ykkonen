import React from 'react'
import './Weather.css'
import Emoji from './Emoji'

const Weather = ({ weatherData }) => (
  <div className="Weather">
    { weatherData.main.temp }° { weatherData.weather[0].icon }
    <Emoji name=":cloud:" />
  </div>
)

export default Weather
