import React, { Component } from 'react'
import { getStopsByLocation } from './Requests'

const getShortCoordinate = (coordinate) => (
  coordinate.toString().slice(0, (coordinate.toString().indexOf("."))+4)
)

class NearestStops extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nearestStops: []
    }

    navigator.geolocation.getCurrentPosition(position => {
      const lat = getShortCoordinate(position.coords.latitude)
      const lon = getShortCoordinate(position.coords.longitude)
      getStopsByLocation(lat, lon).then(nearestStops => {
        this.setState({
          nearestStops
        })
      })
    })

  }

  render() {
    return (
      <div>
        <ul>
          <h4>Nearest stops:</h4>
          {this.state.nearestStops.map(nearestStop =>
            <li key={`${nearestStop.node.stop.gtfsId}`}>
              {nearestStop.node.stop.name} {nearestStop.node.distance}m {nearestStop.node.stop.gtfsId}
            </li>
          )}
        </ul>
      </div>
    )
  }

}

export default NearestStops
