import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"
import { lift } from './lift.ts'
import { not } from './not.ts'

// TODO (ch-shubham) add documentation
const _complement = lift(not)

export const complement: Curry<typeof _complement> = curryN(1, _complement)
