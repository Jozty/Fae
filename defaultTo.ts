import type { PH } from './utils/types.ts'
import curryN from './utils/curry_n.ts'

// @types
type DefaultTo_2<T1> = (<T2>(value: T2) => T1 | T2) &
  ((value?: PH) => DefaultTo_2<T1>)

type DefaultTo_1<T2> = (<T1>(defaultV: T1) => T1 | T2) &
  ((defaultV?: PH) => DefaultTo_1<T2>)

type DefaultTo = (<T1, T2>(defaultV: T1, value: T2) => T1 | T2) &
  (<T1>(defaultV: T1, value?: PH) => DefaultTo_2<T1>) &
  (<T2>(defaultV: PH, value: T2) => DefaultTo_1<T2>) &
  ((defaultV?: PH, value?: PH) => DefaultTo)

function _defaultTo<T1, T2>(defaultV: T1, value: T2) {
  return value == null || value !== value ? defaultV : value
}

/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 *
 *      const defaultTo125 = Fae.defaultTo(125)
 *
 *      defaultTo125(null)  //=> 125
 *      defaultTo125(undefined)  //=> 125
 *      defaultTo125(false)  //=> false
 *      defaultTo125('Fae')  //=> 'Fae'
 */
export const defaultTo: DefaultTo = curryN(2, _defaultTo)
