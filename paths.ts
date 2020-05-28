import { ObjRec, Curry2 } from "./utils/types.ts"
import { isString, isInteger, isArrayLike, isUndefinedOrNull } from "./utils/is.ts"
import nth from "./nth.ts"
import curryN from "./utils/curry_n.ts"
import trim from "./trim.ts"

function getPath(paths: string): string[] {
  if(paths.includes('/')) return trim(paths, '/').split('/')
  if(paths.includes('.')) return trim(paths, '.').split('.')
  return [paths]
}

/**
 * Retrieves the values at given paths `pathsArr` of `obj`.
 * Each path in the `pathsArr` may be any array of keys or
 * string of keys separated by `/` or `.` .
 * 
 *      Krow.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); // [2, 3]
 *      Krow.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); // [2, undefined]
 *      Krow.path([['a', 'b']], {a: {b: 2}}); 2
 *      Krow.path(['a/b/0'], {a: {b: [1, 2, 3]}}); // 1
 *      Krow.path(['a.b.0'], {a: {b: [1, 2, 3]}}); // 2
 */
function paths(pathsArr: Array<string | Array<string | number>>, obj: ObjRec) {
  return pathsArr.map((paths) => {
    if(isString(paths)) paths = getPath(paths)
    let val = obj
    for(let i = 0; i < paths.length; i++) {
      if(isUndefinedOrNull(val)) return val
      const p = paths[i]
      val = isInteger(p as number) && isArrayLike(val)
        ? nth(p as number, val)
        : val[p]
    }
    return val
  })
}

export default curryN(2, paths) as Curry2<Array<string | Array<string | number>>, ObjRec>
