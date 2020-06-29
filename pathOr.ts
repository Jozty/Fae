import { PH, Obj, ObjRec } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import { defaultTo } from './defaultTo.ts'
import { path } from './path.ts'
import { Path } from "./paths.ts"

// @types
type PathOr_1<T> = (<R>(d: R) => R)
  & ((d?: PH) => PathOr_1<T>)

type PathOr_2<T, R> = ((p: Path) => R)
  & ((p?: PH) => PathOr_2<T, R>)

type PathOr_3<R> = (<T>(obj: ObjRec<T> | null) => R)
  & ((obj?: PH) => PathOr_3<R>)

type PathOr_2_3<R> = (<T>(p: Path, obj: ObjRec<T> | null) => R)
  & ((p: Path, obj?: PH) => PathOr_3<R>)
  & (<T>(p: PH, obj: ObjRec<T> | null) => PathOr_2<T, R>)
  & ((p?: PH, obj?: PH) => PathOr_2_3<R>)

type PathOr_1_3 = (<T, R>(d: R, obj: ObjRec<T> | null) => R)
  & (<R>(d: R, obj?: PH) => PathOr_3<R>)
  & (<T>(d: PH, obj: ObjRec<T> | null) => PathOr_1<T>)
  & ((d?: PH, obj?: PH) => PathOr_1_3)

type PathOr_1_2<T> = (<R>(d: R, p: Path) => R)
  & (<R>(d: R, p?: PH) => PathOr_2<T, R>)
  & ((d: PH, p: Path) => PathOr_1<T>)
  & ((d?: PH, p?: PH) => PathOr_1_2<T>)

type PathOr = (<T, R>(d: R, p: Path, obj: ObjRec<T> | null) => R)
  & ((d?: PH, p?: PH, obj?: PH) => PathOr)
  & (<R>(d: R, p?: PH, obj?: PH) => PathOr_2_3<R>)
  & ((d: PH, p: Path, obj?: PH) => PathOr_1_3)
  & (<T>(d: PH, p: PH, obj: ObjRec<T> | null) => PathOr_1_2<T>)
  & (<R>(d: R, p: Path, obj?: PH) => PathOr_3<R>)
  & (<T, R>(d: R, p: PH, obj: ObjRec<T> | null) => PathOr_2<T, R>)
  & (<T>(d: PH, p: Path, obj: ObjRec<T> | null) => PathOr_1<T>)

function _pathOr<T, R>(d: R, p: Path, obj: ObjRec<T> | null) {
  return defaultTo(d, path<T, R>(p, obj))
}

/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 * 
 * 
 *      Fae.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      Fae.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */
export const pathOr: PathOr = curryN(3, _pathOr)