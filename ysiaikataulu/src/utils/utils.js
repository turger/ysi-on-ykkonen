export const minutesToDeparture = (departureTimestamp, currDate = new Date()) => {
  const currDateInSeconds = (currDate.getHours()*60*60)+(currDate.getMinutes()*60)+currDate.getSeconds()
  const diff = Math.abs(departureTimestamp - currDateInSeconds)
  const secondsInDay = 86400
  if (diff > 3600) {
    return Math.floor(((departureTimestamp+secondsInDay)-currDateInSeconds) / 60)
  } else {
    return Math.floor((departureTimestamp-currDateInSeconds) / 60)
  }
}
