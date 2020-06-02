import curryN from "./utils/curry_n.ts"
import { Func, Curry2, Obj } from "./utils/types.ts"
import complement from './complement.ts';
import filter from './filter.ts';

function reject(pred: Func, filterable: Array<any> | Obj) {
  return filter(complement(pred), filterable)
}

export default curryN(2, reject) as Curry2<Func, Array<any> | Obj, Array<any> | Obj>
