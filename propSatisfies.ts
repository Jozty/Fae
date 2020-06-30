import { Obj, Predicate1, PH } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

// @types
type PropSatisfies_1<T> = ((pred: Predicate1<T>) => boolean)
  & ((pred?: PH) => PropSatisfies_1<T>)

type PropSatisfies_2<T> = ((name: string) => boolean)
  & ((name?: PH) => PropSatisfies_2<T>)

type PropSatisfies_3<T> = ((obj: Obj<T>) => boolean)
  & ((obj?: PH) => PropSatisfies_3<T>)

type PropSatisfies_2_3<T> = ((name: string, obj: Obj<T>) => boolean)
  & ((name: string, obj?: PH) => PropSatisfies_3<T>)
  & ((name: PH, obj: Obj<T>) => PropSatisfies_2<T>)
  & ((name?: PH, obj?: PH) => PropSatisfies_2_3<T>)

type PropSatisfies_1_3 = (<T>(pred: Predicate1<T>, obj: Obj<T>) => boolean)
  & (<T>(pred: Predicate1<T>, obj?: PH) => PropSatisfies_3<T>)
  & (<T>(pred: PH, obj: Obj<T>) => PropSatisfies_1<T>)
  & ((pred?: PH, obj?: PH) => PropSatisfies_1_3)

type PropSatisfies_1_2<T> = ((pred: Predicate1<T>, name: string) => boolean)
  & ((pred: Predicate1<T>, name?: PH) => PropSatisfies_2<T>)
  & ((pred: PH, name: string) => PropSatisfies_1<T>)
  & ((pred?: PH, name?: PH) => PropSatisfies_1_2<T>)

type PropSatisfies = (<T>(pred: Predicate1<T>, name: string, obj: Obj<T>) => boolean)
  & ((pred?: PH, name?: PH, obj?: PH) => PropSatisfies)
  & (<T>(pred: Predicate1<T>, name?: PH, obj?: PH) => PropSatisfies_2_3<T>)
  & ((pred: PH, name: string, obj?: PH) => PropSatisfies_1_3)
  & (<T>(pred: PH, name: PH, obj: Obj<T>) => PropSatisfies_1_2<T>)
  & (<T>(pred: Predicate1<T>, name: string, obj?: PH) => PropSatisfies_3<T>)
  & (<T>(pred: Predicate1<T>, name: PH, obj: Obj<T>) => PropSatisfies_2<T>)
  & (<T>(pred: PH,  name: string, obj: Obj<T>) => PropSatisfies_1<T>)

function _propSatisfies<T>(pred: Predicate1<T>, name: string, obj: Obj<T>) {
  return pred(obj[name]);
}

/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise.
 * 
 *      Fae.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */
export const propSatisfies: PropSatisfies = curryN(3, _propSatisfies)