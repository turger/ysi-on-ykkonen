import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Emoji from './Emoji'
import './DateTime.css'

const DateTime = ({ umbrella }) => {
  const [time, setTime] = useState(null)
  const [date, setDate] = useState(null)

  useEffect(() => {
    setTimeAndDate()
    setInterval(() => {
      setTimeAndDate()
    }, 1000)
  }, [])

  const setTimeAndDate = () => {
    setTime(moment().format("HH:mm"))
    setDate(moment().format("DD.MM.YYYY"))
  }

  if (!date && !time) return null
  return (
    <div className="DateTime">
      <div className="DateTime__time">{time}</div>
      <div className="DateTime__date">
        {date}
        {umbrella && (
          <div className="DateTime__umbrella">
            <Emoji name=":umbrella:" />
          </div>
        )}
      </div>
    </div>
  )
}

DateTime.propTypes = {
  setUumbrellambrella: PropTypes.bool,
}

export default DateTime
