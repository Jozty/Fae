import { describe, it } from "./_describe.ts"
import {
  all,
  pipe,
  map,
  inc,
  transduce,
  flip,
  compose,
  Predicate1
} from '../mod.ts'
import { eq, thr } from "./utils/utils.ts"
import {Func} from '../utils/types.ts'

describe('all', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8]
  const arrL = {
    0: 1,
    4: 2,
    6: 7,
    length: 10,
  }
  const mod3: Predicate1 = (a: number) => a % 3 === 1
  const greater0: Predicate1 = (a: number) => a > 0
  it('should work with arrays and array-likes', () => {
    eq(all(mod3, arr), false)
    eq(all(greater0, arr), true)

    eq(all(mod3, arrL), false)
    eq(all(greater0, arrL), false)
  })

  it('should work with transformers too', () => {
    const t1 = pipe(
      // @ts-ignore
      map(inc),
      // @ts-ignore
      all(greater0)
    )

    eq(t1(arr), true)
    eq(transduce(t1, flip((a, b) => a), 11, arr), 2)

    const t2 = compose(
      map(inc),
      all(mod3)
    )

    thr(() => t2([1, 2, 3, 4, 5]), 'Functor can be only array, object or a transformer')
    eq(transduce(t2, flip((a, b) => a), 11, arr), false)
  })
})