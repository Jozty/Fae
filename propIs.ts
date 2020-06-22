import curryN from "./utils/curry_n.ts"
import { Curry, Obj } from "./utils/types.ts"
import { is } from "./utils/is.ts";

function _propIs(type: string, name: string, obj: Obj) {
  return is(obj[name], type)
}

/**
 * Returns `true` if the specified object property(must be passed as string) is of the given type;
 * `false` otherwise.
 * 
 *      Fae.propIs('Number', 'a', {a: 1, y: 2});  //=> true
 *      Fae.propIs('String', 'a', {a: 'foo'});    //=> true
 *      Fae.propIs('Number', 'a', {});            //=> false
 */
export const propIs: Curry<typeof _propIs> = curryN(3, _propIs)