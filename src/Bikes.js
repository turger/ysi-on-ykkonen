import React, { Component } from 'react'
import './Bikes.css'
import Emoji from './Emoji'
import { getBikes } from './Requests'
import { BikeStopId } from './StopConfig'

class Bikes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bikesData: null,
    }
  }

  componentDidMount() {
    this.getBikesData()
    setInterval(() => {
      this.getBikesData()
    } , 60000)
  }

  getBikesData() {
    getBikes(BikeStopId).then(bikesData =>
      this.setState({ bikesData })
    )
  }

  render() {
    if (!this.state.bikesData) return null
    const bikes = this.state.bikesData
    return (
      <div className="Bikes">
        { bikes.bikesAvailable }/{ bikes.bikesAvailable + bikes.spacesAvailable }
        <Emoji name=":woman_biking:" />
      </div>
    )
  }

}

export default Bikes
