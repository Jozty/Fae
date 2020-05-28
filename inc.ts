import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

function inc(element: number){
    return ++element
}

export default <Curry1<number, number>>curryN(1, inc)
