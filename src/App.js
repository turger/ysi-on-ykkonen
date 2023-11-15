import React, { useState } from 'react'
import Bikes from './Bikes'
import Stops from './Stops'
import Weather from './Weather'
import DateTime from './DateTime'
import styles from './App.module.css'

const App = () => {
  const [umbrella, setUmbrella] = useState(false)
  return (
    <div className={styles.App}>
      <div className={styles.AppTop}>
        <DateTime umbrella={umbrella} />
        <Bikes />
      </div>
      <Stops />
      <Weather setUmbrella={setUmbrella} />
    </div>
  )
}

export default App
