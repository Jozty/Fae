import { describe, it } from "./_describe.ts"
import {
  filter,
  pipe,
  map,
  transduce,
  identity,
  flip,
  append,
  compose,
  reverse,
} from '../mod.ts'
import { eq, thr } from "./utils/utils.ts"

const iterable: any = {
  limit: 70,
  current: 65,
  [Symbol.iterator]: function() {
    return {
      l: this.limit,
      i: this.current,
      next() {
        if(this.i < this.l) {
          return {
            value: String.fromCharCode(this.i++),
            done: false
          }
        }
        return {done: true}
      }
    }
  }
}

function* gen() {
  const limit = 5
  let i = 0
  while(i < limit) {
    yield i
    i++
  }
}
const iterator = gen()

describe('filter', () => {
  const even = (a: number) => a % 2 === 0
  const fEven = filter(even)

  it('should reduce an array to those matching a filter', () => {
    eq(fEven([1, 2, 3, 4, 5]), [2, 4])
  })

  it('should return an empty array if no element matches', () => {
    eq(filter((x: number) => x > 100, [1, 9, 99]), [])
  })

  it('returns an empty array if asked to filter an empty array', () => {
    eq(fEven([]), [])
  })

  it('should filter objects', function() {
    const positive = (x: number) => x > 0
    const f = filter(positive)
    eq(f({}), {})
    eq(f({x: 0, y: 0, z: 0}), {})
    eq(f({x: 1, y: 0, z: 0}), {x: 1})
    eq(f({x: 1, y: 2, z: 0}), {x: 1, y: 2})
    eq(f({x: 1, y: 2, z: 3}), {x: 1, y: 2, z: 3})
  })

  it('should work on iterables and iterator', () => {
    const alpha = (a: string) => a > 'C'
    eq(filter(alpha)(iterable), ['D', 'E'])
    eq(fEven(iterator), [0, 2, 4])
  })

  it('should work with transformers', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const transform1 = pipe(
      // @ts-ignore
      map((a: number) => a + 1),
      filter(even)
    )
    eq(transform1(arr), [2, 4, 6, 8, 10])
    eq(transduce(transform1, flip(append), [], arr), [3, 5, 7, 9, 11])

    const transform2 = compose(
      map((a: number) => a + 1),
      filter(even)
    )
    eq(transform2(arr), [3, 5, 7, 9, 11])
    eq(transduce(transform2, flip(append), [], arr), [2, 4, 6, 8, 10])

    const transform3 = pipe(
      map((a: number) => a + 1),
      filter(even),
      reverse
    )
    eq(transform3(arr), [10, 8, 6, 4, 2])

    const transform4 = pipe(
      filter(even)
    )
    eq(transform4(arr), [2, 4, 6, 8, 10])
    eq(transduce(transform4, flip(append), [], arr), [2, 4, 6, 8, 10])
  })
})