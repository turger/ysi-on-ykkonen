import React from 'react'
import './App.css'
import Bikes from './Bikes'
import Stops from './Stops'
import Weather from './Weather'
import Time from './Time'

const App = () => (
  <div className="App" >
    <div className="App_topRow">
      <Time/>
      <Bikes/>
    </div>
    <Stops/>
    <Weather/>
  </div>
)

export default App
