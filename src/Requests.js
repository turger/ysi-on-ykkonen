import 'whatwg-fetch'

export const API_KEY = process.env.REACT_APP_KEY

export const getWeatherData = () => new Promise(resolve => {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?id=658226&APPID=${API_KEY}&units=metric`)
    .then(res => {
      if (res.status !== 200) throw new Error(res.status)
      return res.json()
    })
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      console.warn(err)
    })
})

const getCurrentTimestamp = () => {
  const date = new Date()
  const unixtimestamp = Math.round(date.getTime() / 1000)
  return unixtimestamp
}

const doQuery = query => new Promise(resolve => {
  fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'post',
    headers: {
      'Content-Type': 'application/graphql'
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

export const getStopsByLocation = (lat, lon) => doQuery(`
  {
    stopsByRadius(lat:${lat}, lon:${lon}, radius:500) {
      edges {
        node {
          distance
          stop {
            gtfsId
            name
          }
        }
      }
    }
  }`
).then(res => res.data.stopsByRadius.edges)

export const getStopIds = stopName => doQuery(`
  {
    stops (name: "${stopName}") {
      gtfsId
    }
  }`
).then(res => res.data.stops)

export const getStopRoutes = stopName => doQuery(`
  { stops (name: "${stopName}") {
    id
    name
    gtfsId
    routes
      {
        id
        longName
        shortName
      }
    }
  }`
).then(res => res.data.stops)

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
