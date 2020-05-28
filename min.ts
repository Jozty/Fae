import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function min(a: any, b: any){
    return a < b ? a : b
}

export default <Curry2<any, any, any>>curryN(2, min)
