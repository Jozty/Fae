import { describe, it  } from "./_describe.ts"
import { propIs } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('propIs', () => {

  it('should return true if the specified object property is of the given type', () => {
    eq(propIs('Number', 'a', {a: 1, y: 2}), true)
    eq(propIs('String', 'a', {a: 'foo'}), true)
  })

  it('Should return false otherwise', () => {
    eq(propIs('String', 'ob', {ob: 1}), false)
    eq(propIs('String', 'ob', {}), false)
  })
  
})