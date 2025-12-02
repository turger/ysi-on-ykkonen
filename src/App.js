import {useState} from 'react'
import classNames from 'classnames'
import Bikes from './Bikes'
import Stops from './Stops'
import Weather from './Weather'
import DateTime from './DateTime'
import styles from './App.module.css'

const App = () => {
  const [umbrella, setUmbrella] = useState(false)
  const isPi = process.env.REACT_APP_IS_PI === 'true'

  return (
    <div className={classNames(styles.App, {[styles.IsPi]: isPi})}>
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
