import { isPlaceHolder, areAllPlaceHolder } from "./is_placeholder.ts"
import curry1 from "./curry_1"

/** 
 * @deprecated
 */
export default function curry2(original: Function) {
  return function f<T1, T2>(a: T1, b: T2) {
    switch(arguments.length) {
      case 0: return f
      case 1: {
        if(isPlaceHolder(a)) return f
        return curry1((b2: T2) => original(a, b2))
      }
      default: {
        if(areAllPlaceHolder(...arguments)) return f
        if(isPlaceHolder(a)) return curry1((a2: T1) => original(a2, b))
        if(isPlaceHolder(b)) return curry1((b2: T2) => original(a, b2))
        return original(a, b)
      }
    }
  }
}
