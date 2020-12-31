import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Dec = (element: number) => number

function _dec(element: number) {
  return --element
}

/**
 * Decreases its argument by 1.
 */
export const dec: Dec = curryN(1, _dec)
