import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _append<T>(el: T, list: T[]) {
  return [...list, el]
}

/**
 * Add the `el` to the end of `list` and returns new list without affecting original
 * 
 * 
 *      Fae.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      Fae.append('tests', []); //=> ['tests']
 *      Fae.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */
export const append: Curry<typeof _append> = curryN(2, _append)
