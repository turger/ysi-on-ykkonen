import React, {useState} from 'react'
import Bikes from './Bikes'
import Stops from './Stops'
import Weather from './Weather'
import DateTime from './DateTime'
import styles from './App.module.css'
import classNames from 'classnames'

const App = () => {
  const [umbrella, setUmbrella] = useState(false)
  const isPi = process.env.REACT_APP_IS_PI
  return (
    <div className={classNames(styles.App, {[isPi]: styles.IsPi})}>
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
