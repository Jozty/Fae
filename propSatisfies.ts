import { ObjRec, Predicate1, Curry3 } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

function _propSatisfies(pred: Predicate1, name: string, obj: ObjRec) {
  return pred(obj[name]);
}


/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise.
 * 
 *      Fae.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */
export const propSatisfies: Curry3<Predicate1, string, ObjRec, boolean> = curryN(3, _propSatisfies)
