import { describe, it } from './_describe.ts'
import { eq, thr } from './utils/utils.ts'
import { concat, _ } from '../mod.ts'

describe('concat', () => {
  it('should concat two arrays', () => {
    eq(concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd'])
    eq(concat([], ['c', 'd']), ['c', 'd'])
  })

  it('should work on strings', () => {
    eq(concat('foo', 'bar'), 'foobar')
    eq(concat('x', ''), 'x')
    eq(concat('', 'x'), 'x')
    eq(concat('', ''), '')
    eq(concat(_, '')('aa'), 'aa')
  })

  it('should throw error with incompatible types', () => {
    const message =
      'Types are not compatible. Both the arguments passed must be of same type.'
    //// @ts-expect-error
    // @ts-ignore
    thr(() => concat('bar', ['a', 'foo']), message)
    //// @ts-expect-error
    // @ts-ignore
    thr(() => concat(['a', 'foo'], 'bar'), message)
  })
})
