import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _crossProduct<T1, T2>(a: Array<T1>, b: Array<T2>): [T1, T2][] {
  let result: [T1, T2][] = []
  for(let idx = 0; idx < a.length; idx++)  
    for(let j = 0; j < b.length; j++) 
      result[result.length] = [a[idx], b[j]]
  return result
}

/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the list passed as arguments.
 * 
 *     Fae.crossProduct([1, 2, 3], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b'], [3, 'a'], [3, 'b']]
 */
export const crossProduct: Curry<typeof _crossProduct> = curryN(2, _crossProduct)
