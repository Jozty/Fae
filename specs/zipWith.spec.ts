import { describe, it } from "./_describe.ts"
import { zipWith, add, multiply, _ } from '../mod.ts'
import { eq } from "./utils/utils.ts"
import { Func } from "../utils/types.ts";


describe('zipWith', () => {
  const a = [1, 2, 3]
  const b = [100, 200, 300]
  const c = [10, 20, 30, 40, 50, 60]
  const s = (a: number, b: number) => a + ' cow ' + b
  it('should return an array created by applying its passed-in function pair-wise on its passed in arrays', () => {
    const z = zipWith(_, a, b)
    eq(z(add as Func), [101, 202, 303])
    eq(z(multiply as Func), [100, 400, 900])
    eq(z(s), ['1 cow 100', '2 cow 200', '3 cow 300'])
  })

  it('should return an array whose length is equal to the shorter of its input arrays', () => {
    eq(zipWith(add as Func, a, c).length, a.length)
  })

})