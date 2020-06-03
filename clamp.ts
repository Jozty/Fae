import curryN from "./utils/curry_n.ts"
import { Curry3 } from "./utils/types.ts"

function _clamp(min: string | number, max: string | number, value: string | number){
  if(min > max) throw new Error("Minimum value must be smaller than Maximum value") 
  return value < min
    ? min 
    : value > max
      ? max 
      : value 
}

/**
 * Restricts `value` between `min` and `max`. 
 * Returns `min` if `value < min`, `max` if `value > max`, `value` otherwise
 * 
 * 
 *      Fae.clamp(1, 10, -5) // => 1
 *      Fae.clamp(1, 10, 15) // => 10
 *      Fae.clamp(1, 10, 4)  // => 4
 */
export const clamp: Curry3<string | number> = curryN(3, _clamp)
