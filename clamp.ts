import curryN from "./utils/curry_n.ts"
import { Curry3 } from "./utils/types.ts"

/**
 * Restricts `value` between `min` and `max`. 
 * Returns `min` if `value < min`, `max` if `value > max`, `value` otherwise
 * 
 *      Fae.clamp(1, 10, -5) // => 1
 *      Fae.clamp(1, 10, 15) // => 10
 *      Fae.clamp(1, 10, 4)  // => 4
 */
function clamp(min: string | number, max: string | number, value: string | number){
    if(min > max) throw new Error("Minimum value must be smaller than Maximum value") 
    return value < min
        ? min 
        : value > max
            ? max 
            : value 
}

export default curryN(3, clamp) as Curry3<string | number>
