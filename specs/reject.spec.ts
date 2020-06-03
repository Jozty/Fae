import { describe, it } from "./_describe.ts"
import { reject, curry } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('reject', () => {
  const equals = curry(2, (x: number, y: number) => x === y)
  let even = (x: number) => (x & 1) === 0
  let odd = (x: number) => (x & 1) === 1

  it('should reduce an array to those not matching a filter', () => {
    eq(reject(even, [1, 2, 3, 4, 5]), [1, 3, 5])
    eq(reject(odd, [1, 2, 3, 4, 5]), [2, 4])
  })

  it('should return an empty array if no element matches', () => {
    eq(reject((x) => x < 100, [1, 9, 99]), [])
    eq(reject(odd, []), [])
  })

  it('should filter objects', () => {
    eq(reject(equals(0), {}), {})
    eq(reject(equals(0), {x: 0, y: 0, z: 0}), {})
    eq(reject(equals(0), {x: 1, y: 0, z: 0}), {x: 1})
    eq(reject(equals(0), {x: 1, y: 2, z: 0}), {x: 1, y: 2})
    eq(reject(equals(0), {x: 1, y: 2, z: 3}), {x: 1, y: 2, z: 3})
  })
  
})
