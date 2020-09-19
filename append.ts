import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Append_2<T> = ((list: T[]) => T[]) & ((list?: PH) => Append_2<T>)

type Append_1<T> = ((el: T) => T[]) & ((el?: PH) => Append_1<T>)

type Append = (<T>(el: T, list: T[]) => T[]) &
  (<T>(el: T, list?: PH) => Append_2<T>) &
  (<T>(el: PH, list: T[]) => Append_1<T>) &
  ((el?: PH, list?: PH) => Append)

function _append<T>(el: T, list: T[]) {
  return [...list, el]
}

/**
 * Add the `el` to the end of `list` and returns new list without affecting original
 *
 *
 *      Fae.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      Fae.append('tests', []); //=> ['tests']
 *      Fae.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */
export const append: Append = curryN(2, _append)
