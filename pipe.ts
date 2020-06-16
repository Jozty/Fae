import { Func, FuncArr1 } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import { reduce } from "./reduce.ts"
import { getFunctionLength } from "./utils/get.ts"

function _pipe(f: Func, g: Func) {
  return function(this: any) {
    return g.call(this, f.apply(this, [...arguments]))
  }
}

/**
 * Performs a left-to-right function composition.
 * The first function may have any number of arguments;
 * the remaining must have single argument.
 * **Note:** The returned function is automatically curried.
 * 
 */
export function pipe(func: Func, ...functions: FuncArr1[]) {
  return curryN(
    getFunctionLength(func),
    // @ts-ignore
    reduce(_pipe, func, functions) as Func
  )
}
