import { describe, it } from './_describe.ts'
import { whereEq } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('whereEq', () => {
  it('should return true if the test object satisfies the spec', () => {
    let spec = { x: 1, y: 2 }
    let test1 = { x: 0, y: 200 }
    let test2 = { x: 0, y: 10 }
    let test3 = { x: 1, y: 101 }
    let test4 = { x: 1, y: 2 }
    eq(whereEq(spec, test1), false)
    eq(whereEq(spec, test2), false)
    eq(whereEq(spec, test3), false)
    eq(whereEq(spec, test4), true)
  })

  it('should work if interfaces are different', () => {
    let spec = { x: 100 }
    let spec2 = { w: 1, x: 100, y: 200 }
    let test1 = { x: 20, y: 100, z: 100 }
    let test2 = { w: 1, x: 100, y: 100, z: 100 }
    let test3 = {}
    let test4 = { w: 1, x: 100 }

    eq(whereEq(spec, test1), false)
    eq(whereEq(spec, test2), true)
    eq(whereEq(spec, test3), false)
    eq(whereEq(spec2, test4), false)
  })

  it('should match specs that have undefined properties', () => {
    let spec = { x: undefined }
    let test1 = {}
    let test2 = { x: 1 }
    eq(whereEq(spec, test1), true)
    eq(whereEq(spec, test2), false)
  })

  it('should return false for an empty spec', () => {
    eq(whereEq({}, { a: 1 }), false)
  })
})
