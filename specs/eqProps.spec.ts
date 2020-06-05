import { describe, it } from "./_describe.ts"
import { eqProps } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('eqProps', () => {

  it('should return true when two objects have the same value for a given property', () => {
    eq(eqProps('name', {name: 'shubham', age: 10}, {name: 'shubham', age: 12}), true)
    eq(eqProps('name', {name: 'shivam', age: 10}, {name: 'shubham', age: 10}), false)
    eq(eqProps('value', {value: 0}, {value: -0}), false)
    eq(eqProps('value', {value: -0}, {value: 0}), false)
    eq(eqProps('value', {value: NaN}, {value: NaN}), true)
  })
  
})