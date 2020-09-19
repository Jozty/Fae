import { describe, it } from './_describe.ts'
import { join } from '../mod.ts'
import { eq, thr } from './utils/utils.ts'

const iterable: any = {
  limit: 70,
  current: 65,
  [Symbol.iterator]: function () {
    return {
      l: this.limit,
      i: this.current,
      next() {
        if (this.i < this.l) {
          return {
            value: String.fromCharCode(this.i++),
            done: false,
          }
        }
        return { done: true }
      },
    }
  },
}

function* gen() {
  const limit = 5
  let i = 0
  while (i++ < limit) {
    yield i
  }
}
const iterator = gen()

class XYZ {}

describe('join', () => {
  const joinUnderScore = join('_')
  const join99 = join(99)
  const tS = {
    toString: () => 'THE_OBJECT_WITH_TO_STRING',
  }
  const arrayLike1 = {
    0: '#',
    1: '!',
    2: '@',
    length: 3,
  }
  const arrayLike2 = {
    0: '%%',
    4: '**',
    length: 5,
  }
  it('should join arrays', () => {
    const x = [1, 2, 3, 4, 5]
    const y = [...x]
    eq(joinUnderScore(x), '1_2_3_4_5')
    eq(join99(x), '1992993994995')
    eq(x, y)

    const z = [1, 2, 3, undefined, 2, 5]
    eq(joinUnderScore(z), '1_2_3_2_5')
  })

  it('should join arrays with different types', () => {
    const x = [1, true, '123', tS]
    const y = [...x]
    eq(joinUnderScore(x), '1_true_123_' + tS.toString())
    eq(join99(x), '199true9912399' + tS.toString())
    eq(x, y)
  })

  it('should join array likes', () => {
    eq(joinUnderScore(arrayLike1), '#_!_@')
    eq(joinUnderScore(arrayLike2), '%%_**')
  })

  it('should join values returned by iterator and iterable', () => {
    eq(joinUnderScore(iterable), 'A_B_C_D_E')
    eq(joinUnderScore(iterator), '1_2_3_4_5')
  })

  it('should throw error with other non-iterable objects', () => {
    const x = {
      a: 1,
      b: 2,
    }
    const y = new XYZ()
    thr(
      () => joinUnderScore(x as any),
      'The functor should be an array like or iterable/iterator',
    )
    thr(
      () => joinUnderScore(y as any),
      'The functor should be an array like or iterable/iterator',
    )
    thr(
      () => joinUnderScore(/regex/ as any),
      'The functor should be an array like or iterable/iterator',
    )
  })
})
