import { describe, it} from "./_describe.ts"
import {Predicate1, propSatisfies} from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('propSatisfies', () => {

  let isPositive: Predicate1 = (n: number) => n > 0

  it('should return true if the specified object property satisfies the given predicate', () => {
    eq(propSatisfies(isPositive, 'x', {x: 1, y: 0}), true)
  })

  it('should return false otherwise', () => {
    eq(propSatisfies(isPositive, 'y', {x: 1, y: 0}), false)
  })
  
})