import { describe, it, expect } from "./_describe.ts"
import { 
  reverse,
  _,
} from "../mod.ts"

describe('reverse array', () => {
  it('should reverse array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]
    const arr2 = [...arr]
    const expected = [...arr].reverse()
    expect(reverse(arr)).toEqual(expected)
    expect(arr).toEqual(arr2)
    expect(reverse(_)(arr)).toEqual(expected)
    expect(arr).toEqual(arr2)
  })

  it('should reverse array with undefined and mixed types', () => {
    const arr = [1, 2, '123', 'asf', 'd', {a: 1, b: 3}, () => void 0, Symbol('abc')]
    const arr2 = [...arr]
    const expected = [...arr].reverse()
    expect(reverse(arr)).toEqual(expected)
    expect(arr).toEqual(arr2)
    expect(reverse(_)(arr)).toEqual(expected)
    expect(arr).toEqual(arr2)    
  })
})