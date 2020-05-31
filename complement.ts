import curryN from "./utils/curry_n.ts"
import { Curry2, Func } from "./utils/types.ts"
import lift from './lift.ts'
import not from './not.ts'

//TODO : (ch-shubham) Testing
let complement = lift(not)

export default curryN(1, complement) as Curry2<Func, Func>
