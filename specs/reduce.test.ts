import { describe, it } from "./_describe.ts"
import { reduce, add, multiply, concat } from '../mod.ts'
import { eq } from "./utils/utils.ts"
import reduced from "../utils/reduced.ts"


// TODO: write more tests
describe('reduce', () => {
  type f = (a: number, b: number) => number
  it('should fold simple functions over arrays with the supplied accumulator', () => {
    eq(reduce(add as f, 0, [1, 2, 3, 4]), 10)
    eq(reduce(multiply as f, 1, [1, 2, 3, 4]), 24)
  })

  it('should return the accumulator for an empty array', () => {
    eq(reduce(add as f, 0, []), 0)
    eq(reduce(multiply as f, 1, []), 1)
    eq(reduce(concat as (a: [], b: []) => [], [], []), [])
  })


  it('should short circuit with reduced', () => {
    const addWithMaxOf10 = (acc: number, val: number) => acc + val > 10 ? reduced(acc) : acc + val
    eq(reduce(addWithMaxOf10, 0, [1, 2, 3, 4]), 10)
    eq(reduce(addWithMaxOf10, 0, [2, 4, 6, 8]), 6)
  });
})
