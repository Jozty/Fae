import curryN from "./utils/curry_n.ts"
import { Curry2, FuncArr1, Func } from "./utils/types.ts"
import concat from './concat.ts'
import reduce from './reduce.ts'
import map from './map.ts'
import { isFunction } from "./utils/is.ts"

type ApplyFAp<T, R> = {
  ap: FuncArr1<T[] | Func, R>
}

function _checkForCustomAp<T, R>(applyF: FuncArr1<T, R> | FuncArr1<T, R>[] | ApplyFAp<T, R>): applyF is ApplyFAp<T, R> {
  return isFunction((applyF as ApplyFAp<T, R>).ap)
}

function ap<T, R>(
  applyF: FuncArr1<T, R> | FuncArr1<T, R>[] | ApplyFAp<T, R>,
  applyX: T[] | Func
) {
  if(_checkForCustomAp(applyF)) {
    return applyF.ap(applyX)
  }

  if(isFunction(applyF) && isFunction(applyX)) {
    return (x: T) => applyF(x)(applyX(x))
  }

  return reduce(
    (acc: T[], f: Func) => concat(acc, map(f, applyX)),
    [],
    applyF
  )
}


export default curryN(2, ap) as Curry2<number, number, ReturnType<typeof ap>>
