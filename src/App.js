import React, { useState } from 'react'
import './App.css'
import Bikes from './Bikes'
import Stops from './Stops'
import Weather from './Weather'
import DateTime from './DateTime'

const App = () => {
  const [umbrella, setUmbrella] = useState(false)
  return (
    <div className="App">
      <div className="App__top">
        <DateTime umbrella={umbrella} />
        <Bikes />
      </div>
      <Stops />
      <Weather setUmbrella={setUmbrella} />
    </div>
  )
}

export default App
