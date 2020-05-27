/*
// Restricts the data within a given max and min range 
*/
import curryN from "./utils/curry_n.ts"
import { Curry3 } from "./utils/types.ts"

function clamp(value: any, min: any, max: any){
    if(min > max) throw new Error("Minimum value must be smaller than Maximum value") 
    return value < min 
        ? min 
        : value > max
        ? max 
        : value 
}

export default <Curry3<any, any, any>>curryN(3, clamp)
