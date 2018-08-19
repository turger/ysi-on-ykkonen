import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import { getBikes } from './Requests'
import { BikeStopIds } from './StopConfig'
import Circle from './assets/circle.svg'
import './Bikes.css'


class Bikes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bikesData: {},
    }
    this._bikesBoxes = {}
  }

  componentDidMount() {
    this.getBikesData()
    setInterval(() => {
      this.getBikesData()
    } , 60000)
  }

  componentDidUpdate() {
    Object.keys(this._bikesBoxes).forEach(i => {
      const bikesBox = this._bikesBoxes[i]
      bikesBox.obj && bikesBox.obj.style.setProperty('--percentage', bikesBox.percentage)
    })
  }

  getBikesData() {
    Object.keys(BikeStopIds).map(key =>
      getBikes(BikeStopIds[key]).then(bikeStopTimes => {
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
          { Object.keys(bikes)
            .sort((a, b) => a > b)
            .map( key => {
              const percentage = Math.round((bikes[key].bikesAvailable/(bikes[key].bikesAvailable+bikes[key].spacesAvailable))*100)
              return (
                <div className="BikeStop" key={key} ref={c => (this._bikesBoxes[key] = {percentage, obj: c})}>
                  <ReactSVG
                    path={Circle}
                    svgClassName="circular-chart"
                    className="Percentage__circle"
                  />

                  <div className="BikeStop__availability">
                    <div className="BikeStop__availability__name">
                      { key }
                    </div>
                    <div className="BikeStop__availability__amount">
                      { bikes[key].bikesAvailable }
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
