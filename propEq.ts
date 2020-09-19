import curryN from './utils/curry_n.ts'
import type { PH, Obj } from './utils/types.ts'
import { equals } from './equals.ts'

// @types
type PropEq_1<T> = ((name: string) => boolean) &
  ((name?: PH) => PropEq_1<T>)

type PropEq_2<T> = ((val: T) => boolean) & ((val?: PH) => PropEq_2<T>)

type PropEq_3<T> = ((obj: Obj<T>) => boolean) &
  ((obj?: PH) => PropEq_3<T>)

type PropEq_2_3 = (<T>(val: T, obj: Obj<T>) => boolean) &
  (<T>(val: T, obj?: PH) => PropEq_3<T>) &
  (<T>(val: PH, obj: Obj<T>) => PropEq_2<T>) &
  ((val?: PH, obj?: PH) => PropEq_2_3)

type PropEq_1_3<T> = ((name: string, obj: Obj<T>) => boolean) &
  ((name: string, obj?: PH) => PropEq_3<T>) &
  ((name: PH, obj: Obj<T>) => PropEq_1<T>) &
  ((name?: PH, obj?: PH) => PropEq_1_3<T>)

type PropEq_1_2<T> = ((name: string, val: T) => boolean) &
  ((name: string, val?: PH) => PropEq_2<T>) &
  ((name: PH, val: T) => PropEq_1<T>) &
  ((name?: PH, val?: PH) => PropEq_1_2<T>)

type PropEq = (<T>(name: string, val: T, obj: Obj<T>) => boolean) &
  ((name?: PH, val?: PH, obj?: PH) => PropEq) &
  ((name: string, val?: PH, obj?: PH) => PropEq_2_3) &
  (<T>(name: PH, val: T, obj?: PH) => PropEq_1_3<T>) &
  (<T>(name: PH, val: PH, obj: Obj<T>) => PropEq_1_2<T>) &
  (<T>(name: string, val: T, obj?: PH) => PropEq_3<T>) &
  (<T>(name: string, val: PH, obj: Obj<T>) => PropEq_2<T>) &
  (<T>(name: PH, val: T, obj: Obj<T>) => PropEq_1<T>)

function _propEq<T>(name: string, val: T, obj: Obj<T>) {
  return equals(val, obj[name])
}

/**
 * Returns `true` if the specified object property is equal, to the given value; `false` otherwise.
 *
 *      const shivam = {name: 'shivam', age: 20, hair: 'brown'}
 *      const shubham = {name: 'shubham', age: 22, hair: 'black'}
 *      const Krish = {name: 'krish', age: 25, hair: 'black'}
 *      const students = [shivam, shubham, krish]
 *      const hasBrownHair = Fae.propEq('hair', 'brown')
 *      Fae.filter(hasBrownHair, students) //=> [shubham]
 */
export const propEq: PropEq = curryN(3, _propEq)
