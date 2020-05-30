import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function append<T>(el: T, list: T[]) {
  return [...list, el]
}

/** Add the `el` to the end of `list` and returns new list without affecting original
 * @function
 * 
 *      Fae.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      Fae.append('tests', []); //=> ['tests']
 *      Fae.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']] */
export default curryN(2, append) as Curry2<any, any[], any[]>
