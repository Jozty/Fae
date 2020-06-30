import { dispatch } from "./utils/dispatch.ts"
import ApertureTransformer from "./utils/Transformers/aperture.ts"
import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"

// @types
type Aperture_2 = (<T>(list: T[]) => T[][])
  & ((list?: PH) => Aperture_2)

type Aperture_1<T> = ((n: number) => T[][])
  & ((n?: PH) => Aperture_1<T>)

type Aperture = (<T>(n: number, list: T[]) => T[][])
  & ((n: number, list?: PH) => Aperture_2)
  & (<T>(n: PH, list: T[]) => Aperture_1<T>)
  & ((n?: PH, list?: PH) => Aperture)

function _aperture<T>(n: number, list: T[]) {
  const len = list.length - n + 1
  const result = new Array(Math.max(0, len))

  for (let i = 0; i < len; i++) {
    result[i] = list.slice(i, i + n)
  }
  
  return result
}

const dispatched = dispatch(ApertureTransformer as any, _aperture)

/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is passed in place of `list`
 */
export const aperture: Aperture = curryN(2, dispatched)
