import { describe, it } from './_describe.ts'
import { find, pipe, transduce } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('find', () => {
  const obj1 = { x: 100 }
  const obj2 = { x: 200 }
  const a = [
    11,
    10,
    9,
    'cow',
    obj1,
    8,
    7,
    100,
    200,
    300,
    obj2,
    4,
    3,
    2,
    1,
    0,
  ]
  const even = (x: any) => typeof x === 'number' && x % 2 === 0
  const gt100 = (x: any) => typeof x === 'number' && x > 100
  const isStr = (x: any) => typeof x === 'string'
  const xGt100 = (o: any) => o && o.x > 100
  // const intoArray = R.into([])

  it('should return the first element that satisfies the predicate', () => {
    eq(find(even, a), 10)
    eq(find(gt100, a), 200)
    eq(find(isStr, a), 'cow')
    eq(find(xGt100, a), obj2)
  })

  // TODO:
  // it('transduces the first element that satisfies the predicate into an array', () => {
  //   eq(intoArray(find(even), a), [10])
  //   eq(intoArray(find(gt100), a), [200])
  //   eq(intoArray(find(isStr), a), ['cow'])
  //   eq(intoArray(find(xGt100), a), [obj2])
  // })

  it('should return `undefined` when no element satisfies the predicate', () => {
    eq(find(even, ['zing']), undefined)
  })

  // it('should return `undefined` in array when no element satisfies the predicate into an array', () => {
  //   eq(intoArray(find(even), ['zing']), [undefined])
  // })

  it('should return `undefined` when given an empty list', () => {
    eq(find(even, []), undefined)
  })

  // it('should return `undefined` into an array when given an empty list', () => {
  //   eq(intoArray(find(even), []), [undefined])
  // })

  it('should act as transducer', () => {
    const t1 = pipe(find(even))
    eq(t1(a), 10)
    eq(
      transduce(t1, (a: number, b: number) => b, undefined, a),
      10,
    )
  })
})
