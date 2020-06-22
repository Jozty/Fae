import { ObjRec, Curry } from "./utils/types.ts"
import { isString, isInteger, isArrayLike, isUndefinedOrNull } from "./utils/is.ts"
import { nth } from "./nth.ts"
import curryN from "./utils/curry_n.ts"
import { trim } from "./trim.ts"


export type Path = string | Array<string | number>

export function getPath(path: Path): Array<string | number> {
  if(isString(path)) {
    if(path.includes('/')) return trim(path, '/').split('/')
    if(path.includes('.')) return trim(path, '.').split('.')
    return [path]
  }
  return path as Array<string | number>
}

function _paths(pathsArr: Path[], obj: ObjRec) {
  return pathsArr.map((p) => {
    const path = getPath(p)
    let val = obj
    for(let i = 0; i < path.length; i++) {
      if(isUndefinedOrNull(val)) return
      const p = path[i]
      val = isInteger(p as number) && isArrayLike(val)
        ? nth(p as number, val)
        : val[p]
    }
    return val
  })
}

/**
 * Retrieves the values at given paths `pathsArr` of `obj`.
 * Each path in the `pathsArr` may be any array of keys or
 * string of keys separated by `/` or `.` .
 * 
 * 
 *      Fae.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); // [2, 3]
 *      Fae.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); // [2, undefined]
 *      Fae.path([['a', 'b']], {a: {b: 2}}); 2
 *      Fae.path(['a/b/0'], {a: {b: [1, 2, 3]}}); // 1
 *      Fae.path(['a.b.0'], {a: {b: [1, 2, 3]}}); // 2
 */
export const paths: Curry<typeof _paths> = curryN(2, _paths)
