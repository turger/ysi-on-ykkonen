import {
  minutesToDeparture,
} from './utils'

const timeHelper = (hours, minutes) => hours * 60 * 60 + minutes * 60

describe('minutesToDeparture', () => {

  it('should return minutes to next departure', () => {
   expect(minutesToDeparture(timeHelper(12, 15), new Date(2017, 3, 2, 12, 0, 0) )).toBe(15)
  })

  it('should return minutes to next departure after day change', () => {
   expect(minutesToDeparture(timeHelper(0, 10), new Date(2017, 3, 2, 23, 59, 0) )).toBe(11)
  })

  it('should return negative minutes', () => {
   expect(minutesToDeparture(timeHelper(13, 0), new Date(2017, 3, 2, 13, 5, 0) )).toBe(-5)
  })

})
