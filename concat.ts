import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"
import { isArray, isString } from "./utils/is.ts"

/**
 * Concat two arrays or strings.
 * Both the arguments passed must be of same type.
 */
function concat<T = any>(a: Array<T> | string, b: Array<T> | string) {
  if(isArray(a) && isArray(b)) return a.concat(b)
  if(isString(a) && isString(b)) return a + b
  throw new TypeError('Types are not compatible. Both the arguments passed must be of same type.')
}

export default curryN(2,concat) as Curry2<Array<any> | string, Array<any> | string, Array<any> | string>