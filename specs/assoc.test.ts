import { describe, it } from './_describe.ts'
import { assoc } from '../mod.ts'
import { eq, strictEq } from './utils/utils.ts'

describe('assoc', () => {
  it('should make a shallow clone of an object, overriding only the specified property', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5 }
    const obj2 = assoc('e', { x: 42 }, obj1)
    eq(obj2, { a: 1, b: { c: 2, d: 3 }, e: { x: 42 }, f: 5 })
    // Note: reference equality below!
    strictEq(obj2.a, obj1.a)
    strictEq(obj2.b, obj1.b)
    strictEq(obj2.f, obj1.f)
  })

  it('is the equivalent of clone and set if the property is not on the original', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5 }
    const obj2 = assoc('z', { x: 42 }, obj1)
    eq(obj2, { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5, z: { x: 42 } })
    // Note: reference equality below!
    strictEq(obj2.a, obj1.a)
    strictEq(obj2.b, obj1.b)
    strictEq(obj2.f, obj1.f)
  })
})
