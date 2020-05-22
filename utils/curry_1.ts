import { isPlaceHolder } from "./is_placeholder.ts"

/** 
 * @deprecated
 */
export default function curry1(fn: Function) {
  return function f<T>(this: Function, a: T) {
    if(!a || isPlaceHolder(a)) return f
    else return fn.apply(this, a)
  }
}
