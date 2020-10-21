/* eslint-env mocha */

import Assert from 'assert'

import { breakName } from '../../src/helpers/utils'

describe('breakName', () => {
  describe('when provided a name', () => {
    const number = 2
    const name = breakName('Ubaidillah Waseem bin Abdul Sathar', number)

    it('should return an array', () => {
      Assert(Array.isArray(name))
    })

    it('should return broken names less or equal then requested', () => {
      Assert(name.length <= number)
    })
  })
})
