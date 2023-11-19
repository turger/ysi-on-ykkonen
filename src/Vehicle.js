import React from 'react'
import { ReactSVG } from 'react-svg'
import vehicleAssets from './VehicleAssets'
import styles from './Vehicle.module.css'

const Vehicle = ({mode}) => {
  return (
    <div className={styles.Vehicle}>
      { mode in vehicleAssets &&
        <ReactSVG
          src={vehicleAssets[mode]}
          className={styles.SvgIcon}
        />
      }
      { !(mode in vehicleAssets) && mode }
    </div>
  )
}

export default Vehicle
