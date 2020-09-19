import { describe, it } from './_describe.ts'
import {
  lensProp,
  view,
  set,
  over,
  inc,
  compose,
  identity,
} from '../mod.ts'
import { eq } from './utils/utils.ts'

const testObj = {
  a: 1,
  b: 2,
  c: 3,
}

type Inc = (a: number) => number

describe('lensProp: view', () => {
  it('should focus object the specified object property', () => {
    eq(view(lensProp('a'), testObj), 1)
  })

  it('should return undefined if the specified property does not exist', () => {
    eq(view(lensProp('X'), testObj), undefined)
  })
})

describe('lensProp: set', () => {
  it('should set the value of the object property specified', () => {
    eq(set(lensProp('a'), 0, testObj), { a: 0, b: 2, c: 3 })
  })

  it("should add the property to the object if it doesn't exist", () => {
    eq(set(lensProp('d'), 4, testObj), {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    } as any)
  })
})

describe('lensProp: over', () => {
  it('should apply function to the value of the specified object property', () => {
    eq(over(lensProp('a'), inc as Inc, testObj), { a: 2, b: 2, c: 3 })
  })

  it("should apply function to undefined and adds the property if it doesn't exist", () => {
    eq(over(lensProp('X'), identity, testObj), {
      a: 1,
      b: 2,
      c: 3,
      X: undefined,
    } as any)
  })
})

describe('lensProp: composability', () => {
  it('can be composed', () => {
    const nestedObj = { a: { b: 1 }, c: 2 }
    const composedLens = compose(lensProp('a'), lensProp('b'))

    eq(view(composedLens, nestedObj), 1)
  })
})

describe('lensProp: well behaved lens', () => {
  it('should set s (get s) === s', () => {
    eq(
      set(lensProp('a'), view(lensProp('a'), testObj), testObj),
      testObj,
    )
  })

  it('should get (set s v) === v', () => {
    eq(view(lensProp('a'), set(lensProp('a'), 0, testObj)), 0)
  })

  it('should get (set(set s v1) v2) === v2', () => {
    eq(
      view(
        lensProp('a'),
        set(lensProp('a'), 11, set(lensProp('a'), 10, testObj)),
      ),
      11,
    )
  })
})
