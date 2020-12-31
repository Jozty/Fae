import { describe, it } from './_describe.ts'
import { defaultTo, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('defaultTo', () => {
  let defaultTo125 = defaultTo(125)

  it('should return the default value if input is null, undefined or NaN', () => {
    eq(defaultTo125(null), 125)
    eq(defaultTo125(undefined), 125)
    eq(defaultTo125(NaN), 125)
  })

  it('should return the input value if it is not null/undefined', () => {
    eq('a real value', defaultTo125('a real value'))
  })

  it('should return the input value even if it is considered falsy', () => {
    eq(defaultTo125(''), '')
    eq(defaultTo125(0), 0)
    eq(defaultTo125(false), false)
    eq(defaultTo125([]), [])
  })

  it('should be called with both arguments directly', () => {
    eq(defaultTo(125, null), 125)
    eq('a real value', defaultTo(125, 'a real value'))
  })

  it('should work on curried versions', () => {
    const a = 125
    const b = null
    const expected = 125

    eq(defaultTo(a, b), expected)
    eq(defaultTo(a)(b), expected)
    eq(defaultTo(_, b)(a), expected)
  })
})
