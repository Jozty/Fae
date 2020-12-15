import { describe, it } from './_describe.ts'
import { findLast, pipe, transduce, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('findLast', () => {
  const obj1 = { x: 100 }
  const obj2 = { x: 200 }
  const a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0]
  const even = (x: any) => typeof x === 'number' && x % 2 === 0
  const gt100 = (x: any) => typeof x === 'number' && x > 100
  const isStr = (x: any) => typeof x === 'string'
  const xGt100 = (o: any) => o && o.x > 100
  const intoArray = (a: any) => [a] 

  it('should return the index of the last element that satisfies the predicate', () => {
    eq(findLast(even, a), 0)
    eq(findLast(gt100, a), 300)
    eq(findLast(isStr, a), 'cow')
    eq(findLast(xGt100, a), obj2)
  })


  it('returns the index of the last element that satisfies the predicate into an array', () => {
    eq(intoArray(findLast(even, a)), [0])
    eq(intoArray(findLast(gt100, a)), [300])
    eq(intoArray(findLast(isStr, a)), ['cow'])
    eq(intoArray(findLast(xGt100, a)), [obj2])
  })

  it('should return `undefined` when no element satisfies the predicate', () => {
    eq(findLast(even, ['zing']), undefined)
  })

  it('should returns `undefined` into an array when no element satisfies the predicate', () => {
    eq(intoArray(findLast(even, ['zing'])), [undefined])
  })

  it('should work when the first element matches', () => {
    eq(findLast(even, [2, 3, 5]), 2)
  })

  it('should not go into an infinite loop on an empty array', () => {
    eq(findLast(even, []), undefined)
  })

  it('should return the curried versions too', () => {
    eq(findLast(even, _)([]), undefined)
    eq(findLast(_, [2, 3, 5])(even), 2)
    eq(findLast(even)([2, 3, 5]), 2)
  })

  it('should act as transducer', () => {
    const t1 = pipe(findLast(even))
    eq(t1(a), 0)
    eq(transduce(t1, (a: number, b: number) => b, undefined, a),0)
  })
})
