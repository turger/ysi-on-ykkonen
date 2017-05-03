import React from 'react'
import classNames from 'classnames'
import './Header.css'

const Header = ({stopName, view}) => (
  <div className={classNames('Header',
    {'Header--themeOne': view === 0},
    {'Header--themeTwo': view === 1},
    {'Header--themeThree': view === 2}
  )}>
    <h1>{stopName}</h1>
  </div>
)

export default Header
