import { describe, it } from './_describe.ts'
import { typ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('typ', () => {
  class XYZ {}
  it('should return appropriate types', () => {
    eq(typ({}), 'Object')
    eq(typ(1), 'Number')
    eq(typ(false), 'Boolean')
    eq(typ('s'), 'String')
    eq(typ(null), 'Null')
    eq(typ([]), 'Array')
    eq(typ(/[A-z]/), 'RegExp')
    eq(
      typ(() => {}),
      'Function',
    )
    eq(typ(undefined), 'Undefined')
    eq(typ(new XYZ()), 'Object')
  })

  it('should work with other types also', () => {
    eq(typ(new XYZ()), 'Object')
    eq(typ([1, 2, 3]), 'Array')
    eq(typ(NaN), 'Number')
    eq(typ(new String('I am a String object')), 'String')
    eq(typ(Symbol('abc')), 'Symbol')

    eq(typ(new Map()), 'Map')
    eq(typ(new Set()), 'Set')
    eq(typ(new WeakMap()), 'WeakMap')
    eq(typ(new WeakSet()), 'WeakSet')
  })

  it('should return "Arguments" if given an arguments object', () => {
    const args = function () {
      return arguments
    }
    const a = args()
    eq(typ(a), 'Arguments')
  })

  it('should work with typed arrays', () => {
    const buffer = new ArrayBuffer(256)
    const int8Array = new Int8Array(buffer)
    const int16Array = new Int16Array(buffer)
    const int32Array = new Int32Array(buffer)

    const uint8Array = new Uint8Array(buffer)
    const uint16Array = new Uint16Array(buffer)
    const uint32Array = new Uint32Array(buffer)
    const uint8ClampedArray = new Uint8ClampedArray(buffer)

    const float32Array = new Float32Array(buffer)
    const float64Array = new Float64Array(buffer)

    const bigInt64Array = new BigInt64Array(buffer)
    const bigUint64Array = new BigUint64Array(buffer)

    eq(typ(int8Array), 'Int8Array')
    eq(typ(int16Array), 'Int16Array')
    eq(typ(int32Array), 'Int32Array')
    eq(typ(uint8Array), 'Uint8Array')
    eq(typ(uint16Array), 'Uint16Array')
    eq(typ(uint32Array), 'Uint32Array')
    eq(typ(uint8ClampedArray), 'Uint8ClampedArray')
    eq(typ(float32Array), 'Float32Array')
    eq(typ(float64Array), 'Float64Array')
    eq(typ(bigInt64Array), 'BigInt64Array')
    eq(typ(bigUint64Array), 'BigUint64Array')
  })
})
