import { describe, it, expect } from './_describe.ts'
import { add, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('add', () => {
  it('should be declared correctly', () => {
    eq(add(10, 20), 30)
    eq(add(NaN, 10), NaN)
    eq(add(Infinity, 4), Infinity)
    eq(add(25, Infinity), Infinity)
    eq(add(Infinity, Infinity), Infinity)
    eq(add(0, 0), 0)
    eq(add(25, 0), 25)
  })

  it('should test curried versions too', () => {
    eq(add(25)(25), 50)
    eq(add(_, 25)(25), 50)
    eq(add(25, _)(25), 50)
    eq(add(_, _)(25)(25), 50)
  })
})
