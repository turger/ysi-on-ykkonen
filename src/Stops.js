import React from 'react'
import './Stops.css'
import Stop from './Stop'
import Emoji from './Emoji'

const Stops = ({stops}) => (
  <div className="Stops">
    { Object.keys(stops)
      .sort((a, b) => a > b)
      .map( key =>
      <div className="Stops__times" key={key}>
        <Emoji name={ ':' + key + ':' }/>
        <Stop stops={ stops[key].stoptimesWithoutPatterns }/>
      </div>
      )
    }
  </div>
)

export default Stops
