import { describe, it } from "./_describe.ts"
import { type } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('type', () => {
  class XYZ {}
  it('should return appropriate types', () => {
    eq(type({}), "Object")
    eq(type(1), "Number")
    eq(type(false), "Boolean")
    eq(type('s'), "String")
    eq(type(null), "Null")
    eq(type([]), "Array")
    eq(type(/[A-z]/), "RegExp")
    eq(type(() => {}), "Function")
    eq(type(undefined), "Undefined")
    eq(type(new XYZ()), "Object")
  })

  it('should work with other types also', () => {
    eq(type(new XYZ()), "Object")
    eq(type([1, 2, 3]), "Array")
    eq(type(NaN), 'Number')
    eq(type(new String('I am a String object')), 'String')
    eq(type(Symbol('abc')), "Symbol")
  })

  it('should return "Arguments" if given an arguments object', () => {
    const args = function() { return arguments }
    const a = args()
    eq(type(a), 'Arguments')
  })
})