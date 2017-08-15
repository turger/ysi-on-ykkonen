import React from 'react'
import classNames from 'classnames'
import './Header.css'

const Header = ({stopName, view}) => (
  <div className={classNames('Header',
    {'Header--themeOne': view === 1},
    {'Header--themeTwo': view === 2},
    {'Header--themeThree': view === 3}
  )}>
    <h1>{stopName}</h1>
  </div>
)

export default Header
