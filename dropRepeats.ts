import { dropRepeatsWith } from './dropRepeatsWith.ts'
import { equals } from './equals.ts'
import { dispatch } from './utils/dispatch.ts'
import { DropRepeatsTransformer } from './utils/Transformers/dropRepeatsWith.ts'
import curryN from './utils/curry_n.ts'
import { PH } from './utils/types.ts'

// @types
type DropRepeats = (<T>(list: T[]) => T[])
  & ((list?: PH) => DropRepeats)

const _dropRepeats = dropRepeatsWith(equals)

const dispatched = dispatch(DropRepeatsTransformer as any, _dropRepeats)

/**
 * Returns a new list without any consecutively repeating elements.
 * Fae.equals is used for comparison
 * 
 *      Fae.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */
export const dropRepeats: DropRepeats = curryN(1, dispatched)
