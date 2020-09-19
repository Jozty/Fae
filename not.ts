import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Not = (<T>(fn: T) => boolean) & ((fn?: PH) => Not)

function _not<T>(a: T) {
  return !a
}

export const not: Not = curryN(1, _not)
