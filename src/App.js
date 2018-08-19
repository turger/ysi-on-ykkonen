import React from 'react'
import './App.css'
import Bikes from './Bikes'
import Stops from './Stops'
import Weather from './Weather'
import DateTime from './DateTime'

const App = () => (
  <div className="App" >
    <DateTime/>
    <Bikes/>
    <Stops/>
    <Weather/>
  </div>
)

export default App
