import type { Obj, PH } from './utils/types.ts'
import { prop } from './prop.ts'
import curryN from './utils/curry_n.ts'

// @types
type Props_2 = (<T>(
  obj: Obj<T> | ArrayLike<T>,
) => (T | undefined)[]) &
  ((obj?: PH) => Props_2)

type Props_1<T> = ((p: (string | number)[]) => (T | undefined)[]) &
  ((p?: PH) => Props_1<T>)

type Props = (<T>(
  p: (string | number)[],
  obj: Obj<T> | ArrayLike<T>,
) => (T | undefined)[]) &
  ((p: (string | number)[], obj?: PH) => Props_2) &
  (<T>(p: PH, obj: Obj<T> | ArrayLike<T>) => Props_1<T>) &
  ((p?: PH, obj?: PH) => Props)

function _props<T>(
  p: (string | number)[],
  obj: Obj<T> | ArrayLike<T>,
) {
  return p.map((a) => prop<T>(a, obj))
}

/** Returns an array of multiple on the `obj`. Order is preserved. */
export const props: Props = curryN(2, _props)
