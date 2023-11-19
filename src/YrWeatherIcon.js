import React from 'react'
import PropTypes from 'prop-types'
import {ReactSVG} from 'react-svg'
import styles from './YrWeatherIcon.module.css'

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); })
  return images
}

const YrWeatherIcon = ({name}) => {
  const images = importAll(require.context('/src/assets/weathericons', false, /\.(svg)$/))
  const image = images[`${name}.svg`]
  return <ReactSVG
      src={image}
      beforeInjection={(svg) => {
        svg.classList.add(styles.WeatherSvg)
        svg.setAttribute('style', 'height: 20px')
      }}
    />
}


YrWeatherIcon.propTypes = {name: PropTypes.string.isRequired}

export default YrWeatherIcon
