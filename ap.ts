import curryN from './utils/curry_n.ts'
import type { Curry2, FuncArr1, Func } from './utils/types.ts'
import { concat } from './concat.ts'
import { reduce } from './reduce.ts'
import { map } from './map.ts'
import { isFunction } from './utils/is.ts'

type ApplyFAp<T = any, R = any> = {
  ap: FuncArr1<T[] | Func | T, R>
}

type ApplyF<T = any, R = any> =
  | FuncArr1<T, R>
  | FuncArr1<T, R>[]
  | ApplyFAp<T, R>

function _checkForCustomAp<T, R>(
  applyF: ApplyF<T, R>,
): applyF is ApplyFAp<T, R> {
  return isFunction((applyF as ApplyFAp<T, R>).ap)
}

function _ap<T, R>(applyF: ApplyF<T, R>, applyX: T[] | Func) {
  if (_checkForCustomAp(applyF)) {
    return applyF.ap(applyX)
  }

  if (isFunction(applyF) && isFunction(applyX)) {
    return (x: T) => applyF(x)(applyX(x))
  }

  return reduce(
    // @ts-ignore
    (acc: T[], f: Func) => concat(acc, map(f, applyX) as T[]),
    [],
    applyF as any[],
  )
}

/**
 *Iit applies a list of functions to a list of values.
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 *      const mul2 = Fae.multiply(2)
 *      const add3 = Fae.add(3)
 *      Fae.ap([mul2, add3], [1, 2, 3]) // [2, 4, 6, 4, 5, 6])
 *      const h = Fae.ap(f, mul2)
 *      h(10) // 10 + (10 * 2))
 *      const obj = {ap: (n: number) => 'called ap with ' + n}
 *      Fae.ap(obj, 10) // 'called ap with 10'
 */
export const ap: Curry2<ApplyF, any, any> = curryN(2, _ap)
