import { nth } from './nth.ts'
import curryN from './utils/curry_n.ts'

// @types
type HeadReturnType<F> = F extends string
  ? string
  : F extends (infer U)[]
  ? U
  : never

type Head = <L extends any[] | string>(functor: L) => HeadReturnType<L>

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
