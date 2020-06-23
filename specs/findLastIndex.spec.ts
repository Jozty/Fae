import { describe, it } from "./_describe.ts"
import {
  findLastIndex,
  pipe,
  Predicate1,
  transduce,
} from '../mod.ts'
import { eq } from "./utils/utils.ts"


describe('findLastIndex', () => {
  var obj1 = {x: 100}
  var obj2 = {x: 200}
  var a = [11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0]
  const even: Predicate1 = (x: number) => x % 2 === 0
  const gt100: Predicate1 = (x: number) => x > 100
  const isStr = (x: any) => typeof x === 'string'
  const xGt100 = (o: any) => o && o.x > 100
  // var intoArray = R.into([])

  it('should return the index of the last element that satisfies the predicate', () => {
    eq(findLastIndex(even, a), 15)
    eq(findLastIndex(gt100, a), 9)
    eq(findLastIndex(isStr, a), 3)
    eq(findLastIndex(xGt100, a), 10)
  })

  it('should return -1 when no element satisfies the predicate', () => {
    eq(findLastIndex(even, ['zing']), -1)
  })

  // TODO:
  // it('returns the index of the last element into an array that satisfies the predicate', () => {
  //   eq(intoArray(findLastIndex(even), a), [15])
  //   eq(intoArray(findLastIndex(gt100), a), [9])
  //   eq(intoArray(findLastIndex(isStr), a), [3])
  //   eq(intoArray(findLastIndex(xGt100), a), [10])
  // })

  // it('returns -1 into an array when no element satisfies the predicate', () => {
  //   eq(intoArray(findLastIndex(even), ['zing']), [-1])
  // })

  it('should works when the first element matches', () => {
    eq(findLastIndex(even, [2, 3, 5]), 0)
  })

  it('should not go into an infinite loop on an empty array', () => {
    eq(findLastIndex(even, []), -1)
  })

  it('should act as transducer', () => {
    const t1 = pipe(
      // @ts-ignore
      findLastIndex(even)
    )
    eq(t1(a), 15)
    eq(transduce(t1, (a: number, b: number) => b, undefined, a), 15)

    const t2 = pipe(
      findLastIndex(((x: number) => x > 1000) as Predicate1)
    )
    eq(t2(a), -1)
    eq(transduce(t2, (a: number, b: number) => b, undefined, a), -1)
  })
})
