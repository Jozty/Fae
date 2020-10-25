import { describe, it } from './_describe.ts'
import { flip, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'
import { getFunctionLength } from '../utils/get.ts'

describe('flip', () => {
  const f = (a: string, b: string, c: string) => a + ' ' + b + ' ' + c
  const i = (a: number, b: number, c: number) => a + b * c
  it('should return a function which inverts the first two arguments to the supplied function', () => {
    const g = flip(f)
    eq(f('a', 'b', 'c'), 'a b c')
    eq(g('a', 'b', 'c'), 'b a c')
    eq(g('a', '@', 'A'), '@ a A')  })
  const c = (a: number, b: number, c: number) => a + b * c
  it('should return a function which inverts the first two arguments to the supplied function', () => {
    const h = flip(c)
    eq(i(2, 3, 4), 14)
    eq(h(2, 3, 4), 11)
    eq(i(2, -3, 4), -10)
    eq(h(2, -3, 4), 5)
    })

  it('should return a curried function', () => {
    const g = flip(f)('a')
    eq(g('b', 'c'), 'b a c')
    eq(g(_, 'c')('b'), 'b a c')
    eq(g('b', _)('c'), 'b a c')
    eq(g(_, _)('b', 'c'), 'b a c')

    const h = flip(i)(2)
    eq(h(-4, 5), 6)
    eq(h(-4, _)(3), 2)
    eq(h(_, 3)(-4), 2)
    eq(h(_, _)(-4, 3), 2)
  })

  it('should return a function with the correct arity', () => {
    const f2 = (a: string, b: string) => a + ' ' + b
    const f3 = (a: string, b: string, c: string) =>
      a + ' ' + b + ' ' + c
    eq(getFunctionLength(flip(f2)), 2)
    eq(getFunctionLength(flip(f3)), 3)
  })
})
