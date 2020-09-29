import type { ObjRec, PH } from './utils/types.ts'
import {
  isString,
  isInteger,
  isArrayLike,
  isUndefinedOrNull,
} from './utils/is.ts'
import { nth } from './nth.ts'
import curryN from './utils/curry_n.ts'
import { trim } from './trim.ts'

export type Path = string | Array<string | number>

// @types
type Paths_2 = (<T, R>(obj: ObjRec<T> | null) => R[])

type Paths_1<T, R> = ((pathsArr: Path[]) => R[])

// prettier-ignore
type Paths = 
  & ((pathsArr: Path[], obj?: PH) => Paths_2)
  & (<T, R>(pathsArr: PH, obj: ObjRec<T> | null) => Paths_1<T, R>)
  & (<T, R>(pathsArr: Path[], obj: ObjRec<T> | null) => R[])

export function getPath(path: Path): Array<string | number> {
  if (isString(path)) {
    if (path.includes('/')) return trim(path, '/').split('/')
    if (path.includes('.')) return trim(path, '.').split('.')
    return path ? [path] : []
  }
  return path as Array<string | number>
}

function _paths<T, R>(pathsArr: Path[], obj: ObjRec<T> | null): R[] {
  return pathsArr.map((p) => {
    const path = getPath(p)
    let val: any = obj
    for (let i = 0; i < path.length; i++) {
      if (isUndefinedOrNull(val)) return
      const p = path[i]
      const pInt = parseInt(p as string, 10)
      val =
        isInteger(pInt) && isArrayLike(val) ? nth(pInt, val) : val[p]
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
 *      Fae.paths([[], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); // [ { a: { b: 2 }, p: [ { q: 3 } ] }, 3 ]
 *      Fae.paths([['a', ''], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); // [ undefined, 3 ]
 */
export const paths: Paths = curryN(2, _paths)
