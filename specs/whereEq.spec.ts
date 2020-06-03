import { describe, it } from "./_describe.ts"
import { whereEq, curry } from '../mod.ts'
import { eq } from "./utils/utils.ts"


describe('whereAll', () => {
  const equals = curry(2, (x: number, y: number) => x === y)
  it('should return true if the test object satisfies the spec', () => {
    let spec = {x: 1, y: 2}
    let test1 = {x: 0, y: 200}
    let test2 = {x: 0, y: 10}
    let test3 = {x: 1, y: 101}
    let test4 = {x: 1, y: 2}
    eq(whereEq(spec, test1), false)
    eq(whereEq(spec, test2), false)
    eq(whereEq(spec, test3), false)
    eq(whereEq(spec, test4), true)
  })
  
  it('should work if interfaces are different', () => {
    let spec = {x: 100}
    let test1 = {x: 20, y: 100, z: 100}
    let test2 = {w: 1, x: 100, y: 100, z: 100}
    let test3 = {}


    eq(whereEq(spec, test1), false)
    eq(whereEq(spec, test2), true)
    eq(whereEq(spec, test3), false)
  })

  it('should match specs that have undefined properties', () => {
    let spec = {x: undefined};
    let test1 = {};
    let test2 = {x: null};
    let test3 = {x: undefined};
    let test4 = {x: 1};
    eq(whereEq(spec, test1), true)
    eq(whereEq(spec, test2), false)
    eq(whereEq(spec, test3), true)
    eq(whereEq(spec, test4), false)
  })

  it('should return true for an empty spec', () => {
    eq(whereEq({}, {a: 1}), true)
  })

})