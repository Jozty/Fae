import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function _prepend<T>(el: T, list: T[]) {
  return [el, ...list]
}

/**
 * Add the `el` to the start of `list` and returns new list without affecting original
 * 
 * 
 *      Fae.prepend('tests', ['write', 'more']); //=> [''tests', ''write', 'more']
 *      Fae.prepend('tests', []); //=> ['tests']
 *      Fae.prepend(['tests'], ['write', 'more']); //=> [['tests'], 'write', 'more']
 */
export const prepend: Curry2<any, any[], any[]> = curryN(2, _prepend)
