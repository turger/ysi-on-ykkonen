import React, { Component } from 'react'
import './DateTime.css'
import moment from 'moment'

class DateTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: null,
      date: null
    }
  }

  componentDidMount() {
    this.setTime()
    setInterval(() => {
      this.setTime()
    } , 1000)
  }

  setTime() {
    this.setState({
      time: moment().format('HH:mm'),
      date: moment().format('DD.MM.YYYY')
    })
  }

  render() {
    if (!this.state.date && !this.state.time) return null
    return (
      <div className="DateTime">
        <div className="DateTime__time">
        { this.state.time }
        </div>
        <div className="DateTime__date">
          { this.state.date }
        </div>
      </div>
    )
  }
}

export default DateTime
