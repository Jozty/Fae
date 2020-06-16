import { Obj, Curry2 } from "./types.ts";
import curryN from "./curry_n.ts";

function has<K extends string>(obj: Obj, prop: K): obj is {[_ in K]: unknown} {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

export default curryN(2, has) as Curry2<Obj, number | string, boolean>
