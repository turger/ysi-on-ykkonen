import React from 'react'
import './App.css'
import Bikes from './Bikes'
import Stops from './Stops'
import Weather from './Weather'
import DateTime from './DateTime'

const App = () => (
  <div className="App" >
    <div className="App_topRow">
      <DateTime/>
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
