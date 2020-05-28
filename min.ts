import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function min(a: number | string, b: number | string){
    return a < b ? a : b
}

export default <Curry2<number | string, number | string, number | string>>curryN(2, min)
