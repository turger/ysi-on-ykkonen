import React, { Component } from 'react'
import './Bikes.css'
import Emoji from './Emoji'
import { getBikes } from './Requests'
import { BikeStopIds } from './StopConfig'

class Bikes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bikesData: {},
    }
  }

  componentDidMount() {
    this.getBikesData()
    setInterval(() => {
      this.getBikesData()
    } , 60000)
  }

  getBikesData() {
    Object.keys(BikeStopIds).map(key =>
      getBikes(BikeStopIds[key]).then(bikeStopTimes => {
        console.log(key)
        let bikesData = this.state.bikesData
        bikesData[key] = bikeStopTimes
        this.setState({ bikesData })
      })
    )
  }

  render() {
    if (!this.state.bikesData) return null
    const bikes = this.state.bikesData
    return (
      <div className="Bikes">
        <Emoji name={ ':woman_biking:' }/>
        <div className="Bikes__availability">
          { Object.keys(bikes)
            .sort((a, b) => a > b)
            .map( key =>
            <div className="Bikes__box" key={key}>
              <div className="Bikes__box__stop">
                { key }
              </div>
              <div className="Bikes__box__available">
                { bikes[key].bikesAvailable }
              </div>
            </div>
            )
          }
        </div>
      </div>
    )
  }

}

export default Bikes
