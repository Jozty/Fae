import { describe, it } from "./_describe.ts"
import { typ } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('typ', () => {
  class XYZ {}
  it('should return appropriate types', () => {
    eq(typ({}), "Object")
    eq(typ(1), "Number")
    eq(typ(false), "Boolean")
    eq(typ('s'), "String")
    eq(typ(null), "Null")
    eq(typ([]), "Array")
    eq(typ(/[A-z]/), "RegExp")
    eq(typ(() => {}), "Function")
    eq(typ(undefined), "Undefined")
    eq(typ(new XYZ()), "Object")
  })

  it('should work with other types also', () => {
    eq(typ(new XYZ()), "Object")
    eq(typ([1, 2, 3]), "Array")
    eq(typ(NaN), 'Number')
    eq(typ(new String('I am a String object')), 'String')
    eq(typ(Symbol('abc')), "Symbol")
  })

  it('should return "Arguments" if given an arguments object', () => {
    const args = function() { return arguments }
    const a = args()
    eq(typ(a), 'Arguments')
  })
})