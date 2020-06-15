import { describe, it } from "./_describe.ts"
import { nth, _ } from '../mod.ts'
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
    yield i++
  }
}
let iterator = gen()

describe('nth', () => {
  const arr1 = [1, 2, 3, 4, 5]
  const arr2 = ['as', 'df', 'ef', 'qw']
  const arr3 = [1, 2, undefined, undefined, 4]
  const nthArr1 = nth(_, arr1)
  const nthArr2 = nth(_, arr2)
  const nthArr3 = nth(_, arr3)
  const nthIt1 = nth(_, iterable)

  it('should except +ve offsets', () => {
    eq(nthArr1(1) as number, 2)
    eq(nthArr1(3), 4)
    eq(nthArr1(6), undefined)

    eq(nthArr2(0), 'as')
    eq(nthArr2(2), 'ef')
    eq(nthArr2(5), undefined)

    eq(nthArr3(0), 1)
    eq(nthArr3(2), undefined)
    eq(nthArr3(5), undefined)
  })

  it('should except -ve offsets', () => {
    eq(nthArr1(-1), 5)
    eq(nthArr1(-3), 3)
    eq(nthArr1(-6), undefined)

    eq(nthArr2(-1), 'qw')
    eq(nthArr2(-2), 'ef')
    eq(nthArr2(-5), undefined)

    eq(nthArr3(-1), 4)
    eq(nthArr3(-2), undefined)
    eq(nthArr3(-5), 1)
    eq(nthArr3(-8), undefined)
  })

  it('should work with iterables and iterators', () => {
    // console.log([...iterator])
    eq(nthIt1(0), 'A')
    eq(nthIt1(4), 'E')
    eq(nthIt1(5), undefined)
    eq(nthIt1(15), undefined)
    eq(nthIt1(-1), 'E')
    eq(nthIt1(-5), 'A')
    eq(nthIt1(-6), undefined)

    iterator = gen()
    eq(nth(0, iterator), 0)
    iterator = gen()
    eq(nth(4, iterator), 4)
    iterator = gen()
    eq(nth(5, iterator), undefined)
    iterator = gen()
    eq(nth(15, iterator), undefined)
    iterator = gen()
    eq(nth(-1, iterator), 4)
    iterator = gen()
    eq(nth(-5, iterator), 0)
    iterator = gen()
    eq(nth(-6, iterator), undefined)
  })

  it('should throw error with other types', () => {
    const ob = {
      a: 1,
      b: 2,
    }
    const n = nth(_, ob as any)

    thr(() => n(1), 'The functor should be an array like or iterable/iterator')
    thr(() => n(-1), 'The functor should be an array like or iterable/iterator')
    thr(() => n(8), 'The functor should be an array like or iterable/iterator')
  })
})
