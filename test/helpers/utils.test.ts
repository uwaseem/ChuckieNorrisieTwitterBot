/* eslint-env mocha */

const Assert = require('assert')

import { breakName } from '../../src/helpers/utils'

describe('breakName', () => {
  describe('when provided a name', () => {
    const number = 2
    const name = breakName('Ubaidillah Waseem bin Abdul Sathar', number)

    it('should return an array', () => {
      Assert(Array.isArray(name))
    })

    it('should return less or equal names then requested', () => {
      Assert.strictEqual(name.length, 2)
    })
  })
})
