import type { PH, ObjRec } from './utils/types.ts'
import curryN from './utils/curry_n.ts'
import { defaultTo } from './defaultTo.ts'
import { path } from './path.ts'
import type { Path } from './paths.ts'

// @types
type PathOr_1<T> = (<D, P>(d: D) => D | P) & ((d?: PH) => PathOr_1<T>)

type PathOr_2<T, D> = (<P>(p: Path) => D | P) &
  ((p?: PH) => PathOr_2<T, D>)

type PathOr_3<D> = (<T, P>(obj: ObjRec<T> | null) => D | P) &
  ((obj?: PH) => PathOr_3<D>)

type PathOr_2_3<D> = (<T, P>(
  p: Path,
  obj: ObjRec<T> | null,
) => D | P) &
  ((p: Path, obj?: PH) => PathOr_3<D>) &
  (<T>(p: PH, obj: ObjRec<T> | null) => PathOr_2<T, D>) &
  ((p?: PH, obj?: PH) => PathOr_2_3<D>)

type PathOr_1_3 = (<T, D, P>(d: D, obj: ObjRec<T> | null) => D | P) &
  (<D>(d: D, obj?: PH) => PathOr_3<D>) &
  (<T>(d: PH, obj: ObjRec<T> | null) => PathOr_1<T>) &
  ((d?: PH, obj?: PH) => PathOr_1_3)

type PathOr_1_2<T> = (<D, P>(d: D, p: Path) => D | P) &
  (<D>(d: D, p?: PH) => PathOr_2<T, D>) &
  ((d: PH, p: Path) => PathOr_1<T>) &
  ((d?: PH, p?: PH) => PathOr_1_2<T>)

type PathOr = (<T, D, P>(
  d: D,
  p: Path,
  obj: ObjRec<T> | null,
) => D | P) &
  ((d?: PH, p?: PH, obj?: PH) => PathOr) &
  (<D>(d: D, p?: PH, obj?: PH) => PathOr_2_3<D>) &
  ((d: PH, p: Path, obj?: PH) => PathOr_1_3) &
  (<T>(d: PH, p: PH, obj: ObjRec<T> | null) => PathOr_1_2<T>) &
  (<D>(d: D, p: Path, obj?: PH) => PathOr_3<D>) &
  (<T, D>(d: D, p: PH, obj: ObjRec<T> | null) => PathOr_2<T, D>) &
  (<T>(d: PH, p: Path, obj: ObjRec<T> | null) => PathOr_1<T>)

function _pathOr<T, D, P>(d: D, p: Path, obj: ObjRec<T> | null) {
  return defaultTo(d, path<T, P>(p, obj))
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
