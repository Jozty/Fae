import { describe, it } from "./_describe.ts"
import { allPass, Predicate } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('allPass', () => {

  let odd: Predicate = (n: number) => (n & 1) == 1
  let lt20: Predicate = (n: number) => n < 20 
  let gt5: Predicate = (n: number) => n > 5
  let plusEq: Predicate = (w: number, x: number, y: number, z: number) => w + x === y + z 

  it('should report whether all predicates are satisfied by a given value', () => {
    let ok = allPass([odd, lt20, gt5])
    eq(ok(7), true)
    eq(ok(9), true)
    eq(ok(10), false)
    eq(ok(3), false)
    eq(ok(21), false)
    eq(allPass([odd, gt5, plusEq])(9, 9, 9, 9), true)
    eq(allPass([odd, gt5, plusEq])(9)(9)(9)(9), true)
  })

  it('should return true on empty predicate list', () => {
    eq(allPass([])(3), true)
  })

})