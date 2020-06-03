import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"


/** Creates a new list out of the two supplied by creating each possible pair
 * from the list passed as arguments.
 * @function
 * 
 *     Fae.xprod([1, 2, 3], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b'], [3, 'a'], [3, 'b']]
 */

function crossproduct(a: Array<any>, b: Array<any>) {
  let result = []
  for(let idx = 0; idx < a.length; idx++)  
    for(let j = 0; j < b.length; j++) 
      result[result.length] = [a[idx], b[j]]
  return result
}
export default curryN(2, crossproduct) as Curry2<Array<any>>
