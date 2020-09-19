import { describe, it } from './_describe.ts'
import { whereAll, curry } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('whereAll', () => {
  const equals = curry(2, (x: number, y: number) => x === y)
  it('should return true if the test object satisfies the spec', () => {
    const spec = { x: equals(0), y: equals(2) }
    const test1 = { x: 0, y: 200 }
    const test2 = { x: 0, y: 10 }
    const test3 = { x: 0, y: 2 }
    const test4 = { x: 1, y: 2 }
    eq(whereAll(spec, test1), false)
    eq(whereAll(spec, test2), false)
    eq(whereAll(spec, test3), true)
    eq(whereAll(spec, test4), false)
  })

  it('should not need the spec and the test object to have the same interface (the test object will have a superset of the specs properties)', () => {
    const spec = { x: equals(100), y: equals(20) }
    const test1 = { x: 100, z: 20 }
    const test2 = { w: 1, x: 100, y: 20, z: 100 }

    eq(whereAll(spec, test1), false)
    eq(whereAll(spec, test2), true)
  })

  it('should match specs that have undefined properties', () => {
    const spec = { x: equals(undefined) }
    const test1 = {}
    const test2 = { x: null }
    const test3 = { x: undefined }
    const test4 = { x: 1 }
    eq(whereAll(spec, test1), true)
    // @ts-ignore
    eq(whereAll(spec, test2), false)
    // @ts-ignore
    eq(whereAll(spec, test3), true)
    eq(whereAll(spec, test4), false)
  })

  it('should return false for an empty spec', () => {
    eq(whereAll({}, { a: 1 }), false)
  })

  it('should match inherited properties', () => {
    const spec = {
      toString: equals(Object.prototype.toString),
      valueOf: equals(null),
    }
    eq(whereAll(spec, {}), false)
  })

  it('does not match inherited spec', () => {
    function Spec() {
      // @ts-ignore
      this.y = equals(6)
    }
    Spec.prototype.x = equals(5)
    // @ts-ignore
    const spec = new Spec()

    eq(whereAll(spec, { y: 6 }), true)
    eq(whereAll(spec, { x: 5 }), false)
  })
})
