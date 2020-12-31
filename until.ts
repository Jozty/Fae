import curryN from './utils/curry_n.ts'
import type {
  PH,
  Predicate1,
  FuncArr1,
  InferPrimitive,
} from './utils/types.ts'

// @types
type Until_1<T> = (pred: Predicate1<T>) => T

type Until_2<T> = (fn: FuncArr1<T, T>) => T

type Until_3<T> = (init: T) => T

// prettier-ignore
type Until_2_3<T> =
  & ((fn: FuncArr1<T, T>, init?: PH) => Until_3<T>)
  & (<T>(fn: PH, init: T) => Until_2<T>)
  & ((fn: FuncArr1<T, T>, init: T) => T)

// prettier-ignore
type Until_1_3<T> =
  & ((pred: Predicate1<T>, init?: PH) => Until_3<T>)
  & (<T>(pred: PH, init: T) => Until_1<T>)
  & ((pred: Predicate1<T>, init: T) => T)

// prettier-ignore
type Until_1_2<T> =
  & ((pred: Predicate1<T>, fn?: PH) => Until_2<T>)
  & ((pred: PH, fn: FuncArr1<T, T>) => Until_1<T>)
  & ((pred: Predicate1<T>, fn: FuncArr1<T, T>) => T)

// prettier-ignore
type Until =
  & (<T>(pred: Predicate1<T>, fn?: PH, init?: PH) => Until_2_3<T>)
  & (<T>(pred: PH, fn: FuncArr1<T, T>, init?: PH) => Until_1_3<T>)
  & (<T>(pred: PH, fn: PH, init: T) => Until_1_2<InferPrimitive<T>>)
  & (<T>(pred: Predicate1<T>, fn: FuncArr1<T, T>, init?: PH) => Until_3<T>)
  & (<T>(pred: Predicate1<T>, fn: PH, init: T) => Until_2<InferPrimitive<T>>)
  & (<T>(pred: PH, fn: FuncArr1<T, T>, init: T) => Until_1<T>)
  & (<T>(pred: Predicate1<T>, fn: FuncArr1<T, T>, init: T) => T)

function _until<T>(pred: Predicate1<T>, fn: FuncArr1<T, T>, init: T) {
  let val = init
  while (!pred(val)) {
    val = fn(val)
  }
  return val
}

/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 */
export const until: Until = curryN(3, _until)
