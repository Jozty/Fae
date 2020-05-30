import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function prepend<T>(el: T, list: T[]) {
  return [el, ...list]
}

/** Add the `el` to the start of `list` and returns new list without affecting original
 * @function
 * 
 *      Fae.prepend('tests', ['write', 'more']); //=> [''tests', ''write', 'more']
 *      Fae.prepend('tests', []); //=> ['tests']
 *      Fae.prepend(['tests'], ['write', 'more']); //=> [['tests'], 'write', 'more'] */
export default curryN(2, prepend) as Curry2<any, any[], any[]>
