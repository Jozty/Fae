import { describe, it } from "./_describe.ts"
import { insert } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('insert', () => {
  it('should insert an element into the given list', () => {
    const list = ['a', 'b', 'c', 'd', 'e']
    eq(insert(2, 'x', list), ['a', 'b', 'x', 'c', 'd', 'e'])
  })

  it('should insert another list as an element', () => {
    const list = ['a', 'b', 'c', 'd', 'e']
    eq(insert(2, ['s', 't'], list), ['a', 'b', ['s', 't'], 'c', 'd', 'e'])
  })

  it('should append to the end of the list if the index is too large', () => {
    const list = ['a', 'b', 'c', 'd', 'e']
    eq(insert(8, 'z', list), ['a', 'b', 'c', 'd', 'e', 'z'])
  })
})