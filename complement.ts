import curryN from "./utils/curry_n.ts"
import { Func, Curry1 } from "./utils/types.ts"
import { lift } from './lift.ts'
import { not } from './not.ts'

// TODO (ch-shubham) add documentation
const _complement = lift(not)

export const complement: Curry1<Func, Func> = curryN(1, _complement)
