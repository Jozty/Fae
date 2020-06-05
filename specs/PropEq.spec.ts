import { describe, it, expect } from "./_describe.ts"
import { propEq } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('propEq', () => {
  let obj1 = {name: 'shubham', age: 22, hair: 'blue'}
  let obj2 = {name: 'Shivam', age: 21, hair: 'black'}

  it('should determine property matching a given value for a specific object properly', () => {
    eq(propEq('name', 'shubham', obj1), true)
    eq(propEq('hair', 'black', obj2), true)
    eq(propEq('hair', 'blue', obj2), false)
  })
})