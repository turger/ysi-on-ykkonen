import {
  minutesToDeparture,
} from './utils'

const timeHelper = (hours, minutes) => hours * 60 * 60 + minutes * 60
const currDateInSeconds = new Date(2017, 1, 27).setHours(0,0,0,0) / 1000
const nextDateInSeconds = new Date(2017, 1, 28).setHours(0,0,0,0) / 1000

describe('minutesToDeparture', () => {

  it('should return minutes to next departure', () => {
   expect(minutesToDeparture(timeHelper(12, 15), currDateInSeconds, new Date(2017, 1, 27, 12, 0, 0) ))
    .toBe(15)
  })

  it('should return minutes to next departure after day change', () => {
   expect(minutesToDeparture(timeHelper(0, 10), nextDateInSeconds, new Date(2017, 1, 27, 23, 59, 0) ))
    .toBe(11)
  })

  it('should return time to next departure after day change when more than 60 minutes to departure', () => {
   expect(minutesToDeparture(timeHelper(13, 0), nextDateInSeconds, new Date(2017, 1, 27, 23, 59, 0) ))
    .toBe('13:00')
  })

  it('should return time to next departure when more than 60 minutes to departure', () => {
   expect(minutesToDeparture(timeHelper(14, 0), currDateInSeconds, new Date(2017, 1, 27, 12, 0, 0) ))
    .toBe('14:00')
  })

  it('should return negative minutes', () => {
   expect(minutesToDeparture(timeHelper(13, 0), currDateInSeconds, new Date(2017, 1, 27, 13, 5, 0) ))
    .toBe(-5)
  })

})
