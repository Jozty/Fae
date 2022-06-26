import { describe, it } from './_describe.ts'
import { assocPath, _ } from '../mod.ts'
import { eq, strictEq } from './utils/utils.ts'

describe('assocPath', () => {
  it('should make a shallow clone of an object, overriding only what is necessary for the path', () => {
    const obj1 = {
      a: { b: 1, c: 2, d: { e: 3 } },
      f: { g: { h: 4, i: [5, 6, 7], j: { k: 6, l: 7 } } },
      m: 8,
    }
    const obj2 = assocPath(['f', 'g', 'i', 1], 42, obj1)
    eq(obj2.f.g.i, [5, 42, 7])
    // Note: reference equality below!
    strictEq(obj2.a, obj1.a)
    strictEq(obj2.m, obj1.m)
    strictEq(obj2.f.g.h, obj1.f.g.h)
    strictEq(obj2.f.g.j, obj1.f.g.j)
  })

  it('is the equivalent of clone and setPath if the property is not on the original', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5 }
    const obj2 = assocPath(['x', 0, 'y'], 42, obj1)
    eq(obj2, { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5, x: [{ y: 42 }] })
    // Note: reference equality below!
    strictEq(obj2.a, obj1.a)
    strictEq(obj2.b, obj1.b)
    strictEq(obj2.e, obj1.e)
    strictEq(obj2.f, obj1.f)
  })

  it('should replace the whole object if path is empty', () => {
    eq(assocPath([], 3, { a: 1, b: 2 }), 3 as any)
  })

  it('should replace `undefined` with a new object', () => {
    eq(assocPath(['foo', 'bar', 'baz'], 42, { foo: undefined }), {
      foo: { bar: { baz: 42 } },
    })
  })

  it('should replace `null` with a new object', () => {
    eq(assocPath(['foo', 'bar', 'baz'], 42, { foo: null }), {
      foo: { bar: { baz: 42 } },
    })
  })

  it('should work with curried calls too', () => {
    const functor = {
      a: { b: 1, c: 2, d: { e: 3 } },
      f: { g: { h: 4, i: [5, 6, 7], j: { k: 6, l: 7 } } },
      m: 8,
    }
    const val = 42
    const path = ['f', 'g', 'i', 1]
    const expected = {
      a: { b: 1, c: 2, d: { e: 3 } },
      f: { g: { h: 4, i: [5, 42, 7], j: { k: 6, l: 7 } } },
      m: 8,
    }

    const a_2_3 = assocPath(path)

    eq(a_2_3(val)(functor), expected)
    eq(a_2_3(val, functor), expected)
    eq(a_2_3(_, functor)(val), expected)

    const a_1_3 = assocPath(_, val)

    eq(a_1_3(path)(functor), expected)
    eq(a_1_3(path, functor), expected)
    eq(a_1_3(_, functor)(path), expected)

    const a_1_2 = assocPath(_, _, functor)

    eq(a_1_2(path)(val), expected)
    eq(a_1_2(path, val), expected)
    eq(a_1_2(_, val)(path), expected)

    const a_3 = assocPath(path, val)
    eq(a_3(functor), expected)

    const a_2 = assocPath(path, _, functor)
    eq(a_2(val), expected)

    const a_1 = assocPath(_, val, functor)
    eq(a_1(path), expected)
  })
})
