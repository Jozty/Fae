import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'
import { isArray, isString } from './utils/is.ts'

// @types
type Concat_2<L extends T[] | string, T> = (b: L) => L
  
type Concat_1<L extends T[] | string, T> = (a: L) => L

// prettier-ignore
type Concat =
  &(<L extends T[] | string, T>(a: L, b?: PH) => Concat_2<L, T>)
  &(<L extends T[] | string, T>(a: PH, b: L) => Concat_1<L, T>)
  &(<L extends T[] | string, T>(a: L, b: L) => L)

function _concat<L extends T[] | string, T>(a: L, b: L): L {
  if (isArray<T>(a) && isArray<T>(b)) 
    return a.concat(b) as L
  if (isString(a) && isString(b)) 
    return (a + b) as L
  throw new TypeError('Types are not compatible. Both the arguments passed must be of same type.', )
}

/**
 * Concat two arrays or strings.
 * Both the arguments passed must be of same type.
 */
export const concat: Concat = curryN(2, _concat)
