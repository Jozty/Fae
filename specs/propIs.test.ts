import { describe, it } from './_describe.ts'
import { propIs, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('propIs', () => {
  it('should return true if the specified object property is of the given type', () => {
    eq(propIs('Number', 'a', { a: 1, y: 2 }), true)
    eq(propIs('String', 'a', { a: 'foo' }), true)
    eq(propIs('Number', 'a', {}), false)
  })

  it('should return false otherwise', () => {
    eq(propIs('String', 'ob', { ob: 1 }), false)
    eq(propIs('String', 'ob', {}), false)
  })

  it('should work with curried calls too', () => {
    const obj = { a: 1, b: 'abc', c: false }

    const p_2_3 = propIs('Number')

    eq(p_2_3('a')(obj), true)
    eq(p_2_3('a', obj), true)
    eq(p_2_3(_, obj)('a'), true)
    eq(p_2_3('a', _)(obj), true)

    const p_1_3 = propIs(_, 'a')

    eq(p_1_3('Number')(obj), true)
    eq(p_1_3('Number', obj), true)
    eq(p_1_3(_, obj)('Number'), true)
    eq(p_1_3('Number', _)(obj), true)

    const p_1_2 = propIs(_, _, obj)

    eq(p_1_2('Number')('a'), true)
    eq(p_1_2('Number', 'a'), true)
    eq(p_1_2(_, 'a')('Number'), true)
    eq(p_1_2('Number', _)('a'), true)

    const p_3 = propIs('Number', 'a')
    eq(p_3(obj), true)

    const p_2 = propIs('Number', _, obj)
    eq(p_2('a'), true)

    const p_1 = propIs(_, 'a', obj)
    eq(p_1('Number'), true)
  })
})
