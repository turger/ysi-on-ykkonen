import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Emoji from './Emoji'
import styles from './DateTime.module.css'

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
    <div className={styles.DateTime}>
      <div className={styles.Time}>{time}</div>
      <div className={styles.Date}>
        {date}
        {umbrella && (
          <div className={styles.Umbrella}>
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
