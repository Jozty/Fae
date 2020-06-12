import curryN from "./utils/curry_n.ts"
import { Func, Curry2 } from "./utils/types.ts"
import _assertPromise from "./utils/assertPromise.ts"

function _andThen(f: Func, p: any) {
  _assertPromise('andThen', p);

  return p.then(f);
}

export const andThen: Curry2<Func, any, Promise<any>> = curryN(2, _andThen)