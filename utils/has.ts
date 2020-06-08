import { Obj, Curry2 } from "./types.ts";
import curryN from "./curry_n.ts";

function has(obj: Obj | 'callee', prop: number | string) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export default curryN(2, has) as Curry2<Obj | 'callee', number | string, boolean>