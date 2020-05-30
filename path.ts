import { ObjRec, Curry2 } from "./utils/types.ts"
import paths from './paths.ts'
import curryN from "./utils/curry_n.ts"

function path(ps: string | Array<string | number>, obj: ObjRec) {
  return paths([ps], obj)[0]
}

/** Retrieve the value at a given path.
 * The path may be any array of keys or
 * string of keys separated by `/` or `.` .
 * @function
 * 
 *      Fae.path(['a', 'b'], {a: {b: 2}}); 2
 *      Fae.path(['a', 'b'], {c: {b: 2}}); // undefined
 *      Fae.path('a/b/0', {a: {b: [1, 2, 3]}}); // 1
 *      Fae.path('a.b.0', {a: {b: [1, 2, 3]}}); // 2 */
export default curryN(2, path) as Curry2<string | Array<string | number>, ObjRec>
