import React, { Component } from 'react'
import './Time.css'

const formatTime = datetime => {
  const hours = datetime.getHours()
  const minutes = ('0' + datetime.getMinutes()).slice(-2)
  return hours + ':' + minutes
}

class Time extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datetime: null,
    }
  }

  componentDidMount() {
    this.setTime()
    setInterval(() => {
      this.setTime()
    } , 1000)
  }

  setTime() {
    this.setState({ datetime: formatTime(new Date()) })
  }

  render() {
    if (!this.state.datetime) return null
    return (
      <div className="Time">
        { this.state.datetime }
      </div>
    )
  }

}

export default Time
