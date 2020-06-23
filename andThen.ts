import curryN from "./utils/curry_n.ts"
import { Func, Curry } from "./utils/types.ts"
import { assertPromise } from "./utils/assert.ts"

function _andThen(f: Func, p: any) {
  assertPromise('andThen', p)
  return p.then(f)
}

/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 */
export const andThen: Curry<typeof _andThen> = curryN(2, _andThen)
