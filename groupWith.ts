import { Predicate2, Curry } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import { slice } from "./slice.ts"

function _groupWith<T>(predicate: Predicate2<T | string>, functor: T[] | string) {
  const result: T[][] | string[] = []
  const len = functor.length
  let i = 0
  while(i < len) {
    let j = i + 1
    while(j < len && predicate(functor[j - 1], functor[j])) j++
    result.push(slice(i, j, functor) as (T[] & string))
    i = j
  }
  return result
}

export const groupWith: Curry<typeof _groupWith> = curryN(2, _groupWith)
