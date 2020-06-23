import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"
import { isArray, isString } from "./utils/is.ts"

function _concat<T = any>(a: Array<T> | string, b: Array<T> | string) {
  if(isArray(a) && isArray(b)) return a.concat(b)
  if(isString(a) && isString(b)) return a + b
  throw new TypeError('Types are not compatible. Both the arguments passed must be of same type.')
}

/**
 * Concat two arrays or strings.
 * Both the arguments passed must be of same type.
 */
export const concat: Curry<typeof _concat> = curryN(2,_concat)
