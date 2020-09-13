import curryN from "./utils/curry_n.ts"
import type { PH } from "./utils/types.ts"

// @types
type Identity = (<T>(x: T) => T)
  & ((x?: PH) => Identity)

function _identity<T = any>(x: T) {
  return x
}

/**
 * Returns the supplied parameter
 */
export const identity: Identity = curryN(1, _identity)
