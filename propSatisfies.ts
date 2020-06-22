import { Obj, Predicate1, Curry } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

function _propSatisfies<T>(pred: Predicate1<T>, name: string, obj: Obj<T>) {
  return pred(obj[name])
}

/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise.
 * 
 *      Fae.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */
export const propSatisfies: Curry<typeof _propSatisfies> = curryN(3, _propSatisfies)