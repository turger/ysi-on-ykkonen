import moment from 'moment'

export const getTimeIfMoreThan60min = (minutesToDeparture, departureTimestamp) => {
  if (minutesToDeparture >= 60) {
    const depDate = new Date(departureTimestamp * 1000)
    const hours = depDate.getUTCHours()
    const minutes = ('0' + depDate.getUTCMinutes()).slice(-2)
    return `${hours}:${minutes}`
  } else {
    return minutesToDeparture
  }
}

export const minutesToDeparture = (departureTimestamp, serviceDay, currDate = new Date()) => {
  const currDateInSeconds = (currDate.getHours()*60*60)+(currDate.getMinutes()*60)+currDate.getSeconds()
  const secondsInDay = 86400
  let minutesToDeparture = Math.floor((departureTimestamp-currDateInSeconds) / 60)
  // if service day is next day
  if (serviceDay > (currDate.setHours(0,0,0,0) / 1000)) {
    minutesToDeparture = Math.floor(((departureTimestamp+secondsInDay)-currDateInSeconds) / 60)
  // else if departureTimestamp is more than 24h, this happens between 00:00-06:00
  } else if (departureTimestamp-currDateInSeconds > secondsInDay) {
    minutesToDeparture = Math.floor(((departureTimestamp-secondsInDay)-currDateInSeconds) / 60)
  }
  return getTimeIfMoreThan60min(minutesToDeparture, departureTimestamp)
}

export const formatTime = timestamptxt =>
 moment(timestamptxt).format("HH:mm")

export const extensionConnectionSuitable = (extensionConnection, timeToDeparture) => {
  if (_.isEmpty(extensionConnection)) return false
  const connectionMinMinutes = Number(process.env.REACT_APP_EXTENSION_CONNECTION_MINUTES_BETWEEN)
  const connectionMaxWait = Number(process.env.REACT_APP_EXTENSION_CONNECTION_WAIT_MAX)
  return extensionConnection.some(conn => {
    const connectionDeparture = minutesToDeparture(conn.realtimeArrival, conn.serviceDay)
    const minutesBetweenDepartures = connectionDeparture - timeToDeparture
    return minutesBetweenDepartures >= connectionMinMinutes && minutesBetweenDepartures <= connectionMinMinutes+connectionMaxWait
  })
}