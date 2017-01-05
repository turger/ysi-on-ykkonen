import 'whatwg-fetch'

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

export const getSchedulesForStop = (stopId, startTime) =>
  doQuery(`
  {
  stop(id:"${stopId}"){
    name
    stoptimesWithoutPatterns(
      startTime:"${startTime}",
      timeRange: 18000,
      numberOfDepartures:5
    ) {
      scheduledArrival
      scheduledDeparture
      realtimeArrival
      serviceDay
      stopHeadsign
      trip {
        route {
          gtfsId
          longName
          shortName
        }
      }
    }
  }
}`
).then(res => res.data.stop)
