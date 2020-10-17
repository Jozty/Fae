import { describe, it } from './_describe.ts'
import { props, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('props', () => {
  const obj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }

  it('should return empty array if no properties requested', () => {
    eq(props([], obj), [])
  })

  it('should return values for requested properties', () => {
    eq(props(['a', 'e'], obj), [1, 5])
  })

  it('should preserve order', () => {
    eq(props(['f', 'c', 'e'], obj), [6, 3, 5])
  })

  it('should return undefined for nonexistent properties', () => {
    const ps = props(['a', 'nonexistent'], obj)
    eq(ps.length, 2)
    eq(ps[0], 1)
    eq(ps[1], void 0)
  })

  it('should test curried versions too', () => {
    const properties = ['a', 'e']

    eq(props(properties)(obj), [1, 5])
    eq(props(_, obj)(properties), [1, 5])
    eq(props(properties)(obj), [1, 5])
  })
})
