import curryN from './utils/curry_n.ts'
import { lift } from './lift.ts'
import { not } from './not.ts'

// @types
type Complement = <T extends any[]>(a: (...args: T) => boolean) => (...args: T) => boolean

const _complement = lift(not)
/**
* complement of function(combining)
*/
export const complement: Complement = curryN(1, _complement)
