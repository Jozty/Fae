import { describe, it } from "./_describe.ts"
import { pluck } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('pluck', () => {

  let people = [
    {name: 'Shubham', age: 23},
    {name: 'Shivam', age: 21},
    {name: 'krish', age: 20}
  ]

  it('should return a function that maps the appropriate property over an array', () => {
    eq(typeof pluck('name'), 'function')
    eq(pluck('name')(people), ['Shubham', 'Shivam', 'krish'])
    eq(pluck('age', people), [23, 21, 20])
  })
  
})