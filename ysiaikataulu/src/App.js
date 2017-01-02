import React, { Component } from 'react'
import './App.css'
import { getStopRoutes, getStopIds, getSchedulesForStop } from './Requests.js'

const stopName = 'Huutokonttori'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stops: [],
      ids: []
    }
  }

  componentDidMount() {
    getStopRoutes(stopName).then(stops => {
      this.setState({
        stops: stops
      })
    })

    getStopIds(stopName).then(ids => {
      this.setState({
        ids: ids
      })
    })

    getSchedulesForStop("HSL:1203406", 1483362409).then(stopTimes => {
      console.log(stopTimes)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>{stopName}</h2>
        </div>

        <div>
            {this.state.stops.map(stop =>
              <div key={stop.id}><p className="bold">{stop.name}</p>

                {stop.routes.map(route =>
                  <p key={route.id}>{route.shortName} {route.longName}</p>
                )}

              </div>
            )}
        </div>

      </div>
    )
  }


}

export default App
