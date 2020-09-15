import { describe, it } from "./_describe.ts"
import { defaultTo } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('defaultTo', () => {
  
  let defaultTo125 = defaultTo(125)

  it('should return the default value if input is null, undefined or NaN', () => {
    eq(125, defaultTo125(null))
    eq(125, defaultTo125(undefined))
    eq(125, defaultTo125(NaN))
  })

  it('should return the input value if it is not null/undefined', () => {
    eq('a real value', defaultTo125('a real value'))
  })

  it('should return the input value even if it is considered falsy', () => {
    eq('', defaultTo125(''))
    eq(0, defaultTo125(0))
    eq(false, defaultTo125(false))
    eq([], defaultTo125([]))
  })

  it('should be called with both arguments directly', () => {
    eq(125, defaultTo(125, null))
    eq('a real value', defaultTo(125, 'a real value'))
  })
  
})