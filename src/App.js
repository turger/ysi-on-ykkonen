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
    </div>
    <div className="App_middleRow">
      <Stops/>
      <Bikes/>
    </div>
    <div className="App_bottomRow">
      <Weather/>
    </div>
  </div>
)

export default App
