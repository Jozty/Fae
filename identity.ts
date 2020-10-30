import curryN from './utils/curry_n.ts'

// @types
type Identity = <T>(x: T) => T

function _identity<T = any>(x: T) {
  return x
}

/**
 * Returns the supplied parameter
 */
export const identity: Identity = curryN(1, _identity)
