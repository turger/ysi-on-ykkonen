import 'whatwg-fetch'

export const getYRWeatherData = () => new Promise(resolve => {
  fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${process.env.REACT_APP_LAT}&lon=${process.env.REACT_APP_LON}`)
    .then(res => {
      if (res.status !== 200) throw new Error(res.status)
      resolve(res.text())
    })
    .catch(err => {
      console.warn(err)
    })
})

const getCurrentTimestamp = () => {
  return Math.round(new Date().getTime() / 1000)
}

const doQuery = query => new Promise(resolve => {
  fetch('https://api.digitransit.fi/routing/v2/hsl/gtfs/v1', {
    method: 'post',
    headers: {
      'Content-Type': 'application/graphql',
      'digitransit-subscription-key': process.env.REACT_APP_HSL_KEY
    },
    body: query
  })
    .then(res => {
      if (res.status !== 200) throw new Error(res.status)
      resolve(res.json())
    })
    .catch(err => {
      console.warn(err)
      setTimeout(() => {
        resolve(doQuery(query))
      }, 10000)
    })
})

export const getBikes = (id) => doQuery(`
  {
    bikeRentalStation(id:"${id}") {
      stationId
      name
      bikesAvailable
      spacesAvailable
      lat
      lon
      allowDropoff
    }
  }`
).then(res => res.data.bikeRentalStation)

export const getExtensionConnection = (stopId, patternId, startTime = getCurrentTimestamp()) =>
  doQuery(`
  {
    stop(id: "${stopId}") {
      gtfsId
      name
      stopTimesForPattern(
        id: "${patternId}", 
        startTime: "${startTime}",
        numberOfDepartures: 5,
        omitCanceled: true
      ) {
        realtimeArrival,
        headsign,
        serviceDay
      }
    }
  }  
  `).then(res => res.data.stop)

export const getSchedulesForStop = (stopId, startTime = getCurrentTimestamp()) =>
  doQuery(`
  {
  stop(id:"${stopId}"){
    name
    gtfsId
    patterns {
      name
      headsign
      route {
        longName
        shortName
      }
    }
    stoptimesWithoutPatterns(
      startTime:"${startTime}",
      timeRange: 180000,
      numberOfDepartures:15
    ) {
      scheduledArrival
      scheduledDeparture
      realtimeArrival
      serviceDay
      trip {
        route {
          gtfsId
          longName
          shortName
          mode
        }
      }
    }
  }
}`
  ).then(res => res.data.stop)
