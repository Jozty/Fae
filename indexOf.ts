import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"
import { equals } from './equals.ts'

function _indexOf<T>(value: T, list: T[]) {
  switch(typeof value) {
    case 'number': {
      if(value === 0) {
        // handles +0 and -0
        const inf = 1 / value
        for (let i = 0; i < list.length; i++) {
          const x: any = list[i]
          if(x === 0 && 1 / x === inf) return i
        }
        return -1
      }
      else if(value !== value) {
        // handles NaN
        for (let i = 0; i < list.length; i++) {
          const x: any = list[i]
          if(isNaN(x)) return i
        }
        return -1
      }
    }
    case 'string':
    case 'boolean':
    case 'function':
    case 'undefined':
      return list.indexOf(value)

    case 'object':
      if (value === null) {
        return list.indexOf(value)
      }
  }


  let idx = -1
  list.forEach((a, i) => idx = equals(value, a) ? i : idx)
  return idx
}

/**
 * Returns the position of the first occurrence of `value` in `list`, or -1
 * if the item is not included in the array. [`Fae.equals`](#equals) is used to
 * determine equality.
 *
 *      Fae.indexOf(3, [1,2,3,4]); //=> 2
 *      Fae.indexOf(10, [1,2,3,4]); //=> -1
 *      Fae.indexOf(0, [1, 2, 3, 0, -0, NaN]); //=> 3
 *      Fae.indexOf(-0, [1, 2, 3, 0, -0, NaN]); //=> 4
 *      Fae.indexOf(NaN, [1, 2, 3, 0, -0, NaN]); //=> 5
 */
export const indexOf: Curry<typeof _indexOf> = curryN(2, _indexOf)
