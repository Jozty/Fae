import { PH, Obj } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import { equals } from "./equals.ts"

// @types
type EqProps_1<T> = ((prop: string) => boolean)
  & ((prop?: PH) => EqProps_1<T>)

type EqProps_2<T> = ((obj1: Obj<T>) => boolean)
  & ((obj1?: PH) => EqProps_2<T>)

type EqProps_3<T> = ((obj2: Obj<T>) => boolean)
  & ((obj2?: PH) => EqProps_3<T>)

type EqProps_2_3 = (<T>(obj1: Obj<T>, obj2: Obj<T>) => boolean)
  & (<T>(obj1: Obj<T>, obj2?: PH) => EqProps_3<T>)
  & (<T>(obj1: PH, obj2: Obj<T>) => EqProps_2<T>)
  & ((obj1?: PH, obj2?: PH) => EqProps_2_3)

type EqProps_1_3<T> = ((prop: string, obj2: Obj<T>) => boolean)
  & ((prop: string, obj2?: PH) => EqProps_3<T>)
  & ((prop: PH, obj2: Obj<T>) => EqProps_1<T>)
  & ((prop?: PH, obj2?: PH) => EqProps_1_3<T>)

type EqProps_1_2<T> = ((prop: string, obj1: Obj<T>) => boolean)
  & ((prop: string, obj1?: PH) => EqProps_2<T>)
  & ((prop: PH, obj1: Obj<T>) => EqProps_1<T>)
  & ((prop?: PH, obj1?: PH) => EqProps_1_2<T>)

type EqProps = (<T>(prop: string, obj1: Obj<T>, obj2: Obj<T>) => boolean)
  & ((prop?: PH, obj1?: PH, obj2?: PH) => EqProps)
  & ((prop: string, obj1?: PH, obj2?: PH) => EqProps_2_3)
  & (<T>(prop: PH, obj1: Obj<T>, obj2?: PH) => EqProps_1_3<T>)
  & (<T>(prop: PH, obj1: PH, obj2: Obj<T>) => EqProps_1_2<T>)
  & (<T>(prop: string, obj1: Obj<T>, obj2?: PH) => EqProps_3<T>)
  & (<T>(prop: string, obj1: PH, obj2: Obj<T>) => EqProps_2<T>)
  & (<T>(prop: PH, obj1: Obj<T>, obj2: Obj<T>) => EqProps_1<T>)

function _eqProps<T>(prop: string, obj1: Obj<T>, obj2: Obj<T>) {
  return equals(obj1[prop], obj2[prop])
}

/**
 * Reports whether two objects have the same value, for the specified property. 
 * Useful as a curried predicate.
 * 
 *      const obj1 = { a: 1, b: 2, c: 3, d: 4 }
 *      const obj2 = { a: 10, b: 20, c: 3, d: 40 }
 *      Fae.eqProps('a', obj1, obj2) //=> false
 *      Fae.eqProps('c', obj1, obj2) //=> true
 */
export const eqProps: EqProps = curryN(3, _eqProps)