import React from 'react'
import './App.css'
import Stops from './Stops'
import Weather from './Weather'
import Time from './Time'

const App = () => (
  <div className="App" >
    <div className="App_topRow">
      <Time/>
      <Weather type="current"/>
    </div>
    <Stops/>
    <Weather type="5days"/>
  </div>
)

export default App
