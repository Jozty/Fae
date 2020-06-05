import curryN from "./utils/curry_n.ts"
import { Curry3, Obj, ObjRec } from "./utils/types.ts"
import { pathOr } from "./pathOr.ts"
import { Path } from "./paths.ts"

function _propOr(val: any, p: Path, obj: ObjRec | null) {
  return pathOr(val, [p], obj)
}

/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *      const alice = {
 *        name: 'Fae',
 *        age: 15
 *      };
 *      const Great = Fae.prop('GreatLibrary');
 *      const GreatWithDefault = Fae.propOr('FaeModule', 'GreatLibrary');
 *
 *      Great(Fae);  //=> undefined
 *      GreatWithDefault(Fae);  //=> 'FaeModule'
 */
export const propOr: Curry3<any, Path, ObjRec | null, any> = curryN(3, _propOr)