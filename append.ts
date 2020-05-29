import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

/**
 * Add the `el` to the end of `list` and returns new list without affecting original
 * 
 *      Fae.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      Fae.append('tests', []); //=> ['tests']
 *      Fae.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */
function append<T>(el: T, list: T[]) {
  return [...list, el]
}

export default curryN(2, append) as Curry2<any, any[], any[]>
