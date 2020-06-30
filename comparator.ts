import { Comparator, Predicate2 } from "./utils/types.ts"

/**
 * Returns a comparator out of `predicate` which returns `true` when
 * its first argument is less than the second, `false` otherwise
 */
export function comparator<T>(predicate: Predicate2<T, T>): Comparator<T> {
  return function(a: T, b: T) {
    return(
      predicate(a, b)
        ? -1
        : predicate(b, a)
          ? 1
          : 0
    )
  }
}
