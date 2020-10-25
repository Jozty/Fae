import curryN from './utils/curry_n.ts'

// @types
type Inc = ((element: number) => number)

function _inc(element: number) {
  return ++element
}

/**
 * Increases its argument by 1.
 */
export const inc: Inc = curryN(1, _inc)
