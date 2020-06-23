import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _identity<T>(x: T) {
  return x
}

/**
 * Returns the supplied parameter
 */
export const identity: Curry<typeof _identity> = curryN(1, _identity)
