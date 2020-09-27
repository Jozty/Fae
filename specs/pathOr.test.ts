import { describe, it } from './_describe.ts'
import { pathOr } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('pathOr', () => {
  let deepObject = {
    a: { b: { c: 'c' } },
    falseVal: false,
    nullVal: null,
    undefinedVal: undefined,
    arrayVal: ['arr'],
  }

  it('should take a path and an object and returns the value at the path or the default value', () => {
    let obj = {
      a: {
        b: {
          c: 100,
          d: 200,
        },
        e: {
          f: [100, 101, 102],
          g: 'G',
        },
        h: 'H',
      },
      i: 'I',
      j: ['J'],
    }
    eq(pathOr('Unknown', ['a', 'b', 'c'], obj), 100)
    eq(pathOr('Unknown', [], obj), obj)
    eq(pathOr('Unknown', '', obj), obj)
    eq(pathOr('Unknown', ['a',''], obj), 'Unknown')
    eq(pathOr('Unknown', ['a', 'e', 'f', 1], obj), 101)
    eq(pathOr('Unknown', ['a', 'e', 'f', -2], obj), 101)
    eq(pathOr('Unknown', ['j', 0], obj), 'J')
    eq(pathOr('Unknown', ['j', 1], obj), 'Unknown')
    eq(pathOr('Unknown', ['a', 'b', 'c'], null), 'Unknown')
  })

  it("should get a deep property's value from objects", () => {
    eq(pathOr('Unknown', ['a', 'b', 'c'], deepObject), 'c')
    eq(pathOr('Unknown', ['a'], deepObject), deepObject.a)
  })

  it('should return the default value for items not found', () => {
    eq(pathOr('Unknown', ['a', 'b', 'foo'], deepObject), 'Unknown')
    eq(pathOr('Unknown', ['bar'], deepObject), 'Unknown')
  })

  it('should return the default value for null/undefined', () => {
    eq(pathOr('Unknown', ['toString'], null), 'Unknown')
    // fae-no-check
    eq(pathOr('Unknown', ['toString'], undefined) as any, 'Unknown')
  })

  it('should work with falsy items', () => {
    eq(
      // fae-no-check
      // @ts-ignore
      pathOr('Unknown', ['toString'], false),
      Boolean.prototype.toString,
    )
  })
})
