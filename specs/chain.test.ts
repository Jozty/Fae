import { describe, it } from './_describe.ts'
import { chain, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('chain', () => {
  let add1 = (x: any) => {
    return [x + 1]
  }
  let dec = (x: any) => {
    return [x - 1]
  }
  let times2 = (x: any) => {
    return [x * 2]
  }

  const list = [10, undefined, 35, Infinity]
  let c = chain(_, list)

  it('maps a function over a nested list and returns the result', function () {
    // @ts-ignore
    eq(c(times2), [20, NaN, 70, Infinity])
    // @ts-ignore
    eq(c(add1), [11, NaN, 36, Infinity])
    // @ts-ignore
    eq(c(dec), [9, NaN, 34, Infinity])
  })
})
