import { Func } from "./utils/types.ts"
import Transformer from "./utils/Transformers/transformers.ts"
import { reduce } from './reduce.ts'
import { getTransformer } from "./utils/get.ts"

/**
 * Initializes a transducer using supplied iterator function `trans2`.
 * Returns a single item by iterating through the list,
 * successively calling the transformed `trans2` and passing it `acc`
 * and the current value from the array, and then passing through `trans1`
 * and then passing the result to the next call.
 * 
 * 
 *      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *      const t1 = Fae.pipe(
 *        Fae.map(inc),
 *        Fae.filter(even),
 *        Fae.take(2)
 *      )
 *      t1(arr) // [2, 4]
 *      Fae.transduce(t1, Fae.flip(Fae.append), [], arr) // [3]
 */
export function transduce<T, L = T>(trans1: Func, trans2: Func | Transformer, acc: T, functor: L[]) {
  const trans = getTransformer(trans2)
  return reduce(trans1(trans), acc, functor)
}
