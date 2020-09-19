import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Trim_2 = ((t: string) => string) & ((t?: PH) => Trim_2)

type Trim_1 = ((str: string) => string) & ((str?: PH) => Trim_1)

type Trim = ((str: string, t: string) => string) &
  ((str: string, t?: PH) => Trim_2) &
  ((str: PH, t: string) => Trim_1) &
  ((str?: PH, t?: PH) => Trim)

function escapeRegEx(str: string) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function _trim(str: string, t: string) {
  t = escapeRegEx(t)
  const regEx = new RegExp(`^(${t})+|(${t})+$`, 'g')
  return t ? str.replace(regEx, '') : str.trim()
}

/**
 * Trims the string `str` from both end with `t`.
 * Trims with white space if `t` is [''], with `t` otherwise.
 *
 *      Fae.trim('   xyz  ', ''); // 'xyz
 *      Fae.trim('[[Hello]]]', '[') // Hello]]]
 *      Fae.trim('[[Hello]]]', ']]') // [[Hello]]
 */
export const trim: Trim = curryN(2, _trim)
