import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"

// @types
type Clamp_1<T> = ((min: T) => T)
  & ((min?: PH) => Clamp_1<T>)

type Clamp_2<T> = ((max: T) => T)
  & ((max?: PH) => Clamp_2<T>)

type Clamp_3<T> = ((value: T) => T)
  & ((value?: PH) => Clamp_3<T>)

type Clamp_2_3<T> = ((max: T, value: T) => T)
  & ((max: T, value?: PH) => Clamp_3<T>)
  & ((max: PH, value: T) => Clamp_2<T>)
  & ((max?: PH, value?: PH) => Clamp_2_3<T>)

type Clamp_1_3<T> = ((min: T, value: T) => T)
  & ((min: T, value?: PH) => Clamp_3<T>)
  & ((min: PH, value: T) => Clamp_1<T>)
  & ((min?: PH, value?: PH) => Clamp_1_3<T>)

type Clamp_1_2<T> = ((min: T, max: T) => T)
  & ((min: T, max?: PH) => Clamp_2<T>)
  & ((min: PH, max: T) => Clamp_1<T>)
  & ((min?: PH, max?: PH) => Clamp_1_2<T>)

type Clamp = (<T>(min: T, max: T, value: T) => T)
  & (<T>(min?: PH, max?: PH, value?: PH) => Clamp)
  & (<T>(min: T, max?: PH, value?: PH) => Clamp_2_3<T>)
  & (<T>(min: PH, max: T, value?: PH) => Clamp_1_3<T>)
  & (<T>(min: PH, max: PH, value: T) => Clamp_1_2<T>)
  & (<T>(min: T, max: T, value?: PH) => Clamp_3<T>)
  & (<T>(min: T, max: PH, value: T) => Clamp_2<T>)
  & (<T>(min: PH, max: T, value: T) => Clamp_1<T>)

function _clamp<T extends number | string>(min: T, max: T, value: T): T {
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
export const clamp: Clamp = curryN(3, _clamp)
