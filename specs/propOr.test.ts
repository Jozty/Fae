import { describe, it } from './_describe.ts'
import { propOr, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('propOr', () => {
  let shubham = { name: 'shubham', age: 23 }
  let shivam = { age: 99 }

  let num = propOr('Unknown', 'name')

  it('should return a function that fetches the appropriate property', () => {
    eq(typeof num, 'function')
    eq(num(shubham), 'shubham')
  })

  it('should return the default value when the property does not exist', () => {
    eq(num(shivam), 'Unknown')
  })

  it('should return the default value when the object is nil', () => {
    eq(num(null), 'Unknown')
    // @ts-ignore
    eq(num(void 0), 'Unknown' as any)
  })

  it('should use the default when supplied an object with a nil value', () => {
    eq(propOr('foo', 'x', { x: null }), 'foo')
    eq(propOr('foo', 'x', { x: undefined }), 'foo')
  })

  it('should work with curried calls too', () => {
    const obj = { a: 1, b: 'abc', c: false }

    const x = propOr([1], 'a', obj)

    const p_2_3 = propOr('default')

    eq(p_2_3('d')(obj), 'default')
    eq(p_2_3('d', obj), 'default')
    eq(p_2_3(_, obj)('d'), 'default')
    eq(p_2_3('d', _)(obj), 'default')

    const p_1_3 = propOr(_, 'd')

    eq(p_1_3('default')(obj), 'default')
    eq(p_1_3('default', obj), 'default')
    eq(p_1_3(_, obj)('default'), 'default')
    eq(p_1_3('default', _)(obj), 'default')

    const p_1_2 = propOr(_, _, obj)

    eq(p_1_2('default')('d'), 'default')
    eq(p_1_2('default', 'd'), 'default')
    eq(p_1_2(_, 'd')('default'), 'default')
    eq(p_1_2('default', _)('d'), 'default')

    const p_3 = propOr('default', 'd')
    eq(p_3(obj), 'default')

    const p_2 = propOr('default', _, obj)
    eq(p_2('d'), 'default')

    const p_1 = propOr(_, 'd', obj)
    eq(p_1('default'), 'default')
  })
})
