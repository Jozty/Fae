import curryN from './utils/curry_n.ts'
import type {
  Func,
  PH,
  FuncArr1,
  Predicate1,
  Predicate,
} from './utils/types.ts'
import { lift } from './lift.ts'
import { not } from './not.ts'

// @types
type Complement = (<T extends any[]>(
  a: (...args: T) => boolean,
) => (...args: T) => boolean) &
  ((fn?: PH) => Complement)

// TODO (ch-shubham) add documentation
const _complement = lift(not)

export const complement: Complement = curryN(1, _complement)
