import React, { Component } from 'react'
import { ReactSVG } from 'react-svg'
import _ from 'lodash'
import { getBikes } from './requests'
import Circle from './assets/circle.svg'
import Emoji from './Emoji'
import styles from './Bikes.module.css'

class Bikes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bikesData: {},
      errorMessage: null,
    }
    this._bikesBoxes = {}
  }

  componentDidMount() {
    this.getBikesData()
    setInterval(() => {
      this.getBikesData()
    }, 60000)
  }

  componentDidUpdate() {
    Object.keys(this._bikesBoxes).forEach(i => {
      const bikesBox = this._bikesBoxes[i]
      bikesBox.obj && bikesBox.obj.style.setProperty('--percentage', bikesBox.percentage)
    })
  }

  getBikesData() {
    const bikeStopIds = process.env.REACT_APP_BIKE_STOP_IDS ? process.env.REACT_APP_BIKE_STOP_IDS.split(',') : []
    if (_.isEmpty(bikeStopIds)) this.setState({ errorMessage: 'No stops found!' })
    bikeStopIds.forEach(pair => {
      const name = pair.split(':')[0]
      const id = pair.split(':')[1]
      getBikes(id).then(bikeStopTimes => {
        let bikesData = this.state.bikesData
        bikesData[name] = bikeStopTimes
        this.setState({ bikesData })
      })
    })
  }

  render() {
    const { bikesData, errorMessage } = this.state
    if (!bikesData) return null
    return (
      <div className={styles.Bikes}>
        {errorMessage && <div>{errorMessage}</div>}
        {Object.keys(bikesData)
          .sort((a, b) => a > b)
          .map(key => {
            const bikesAvailable = _.get(bikesData, `${key}.bikesAvailable`)
            const spacesAvailable = _.get(bikesData, `${key}.spacesAvailable`)
            const percentage = Math.round((bikesAvailable / (bikesAvailable + spacesAvailable)) * 100) || 0
            const currentMonth = new Date().getMonth() + 1
            const isWinter = currentMonth > 10 || currentMonth < 4
            return (
              <div className={styles.BikeStop} key={key} ref={c => (this._bikesBoxes[key] = { percentage, obj: c })}>
                {!isWinter && <ReactSVG
                  src={Circle}
                />}
                <div className={styles.Availability}>
                  <div className={styles.AvailabilityName}>
                    {key}
                  </div>
                  <div className={styles.AvailabilityAmount}>
                    {isWinter && <Emoji name=':snowman:' />}
                    {!isWinter && bikesAvailable}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

}

export default Bikes
