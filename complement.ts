import curryN from "./utils/curry_n.ts"
import { Func, Curry1 } from "./utils/types.ts"
import lift from './lift.ts'
import not from './not.ts'

const complement = lift(not)

export default curryN(1, complement) as Curry1<Func, Func>
