import { nth } from './nth.ts'
import curryN from './utils/curry_n.ts'
import type { InferElementType } from './utils/types.ts'

// @types
// prettier-ignore
type Head = <L extends any[] | string>(functor: L) => InferElementType<L>

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 *      Fae.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      Fae.head([]); //=> undefined
 *
 *      Fae.head('abc'); //=> 'a'
 *      Fae.head(''); //=> ''
 */
export const head: Head = curryN(1, nth(0))
