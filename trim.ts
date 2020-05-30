import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function escapeRegEx(str: string) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function trim(str: string, t: string = '') {
  t = escapeRegEx(t)
  const regEx = new RegExp(`^(${t})+|(${t})+$`, 'g')
  return t ? str.replace(regEx, '') : str.trim()
}

/** Trims the string `str` from both end with `t`.
 * Trims with white space if `t` is [''], with `t` otherwise.
 * @function
 * 
 *      Fae.trim('   xyz  ', ''); // 'xyz
 *      Fae.trim('[[Hello]]]', '[') // Hello]]]
 *      Fae.trim('[[Hello]]]', ']]') // [[Hello]] */
export default curryN(2, trim) as Curry2<string, string, string>
