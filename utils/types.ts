import { _, FUNCTION_LENGTH } from "./constants.ts";

type PlaceHolder = typeof _
export interface Curry1<T, R = T> {
  (a: PlaceHolder): Curry1<T, R>
  (a: T): R
}

export interface Curry2<T1, T2 = T1, R = T1> {
  (t1?: PlaceHolder): Curry2<T1, T2, R>
  (t1: T1): Curry1<T2, R>
  (t1?: PlaceHolder, t2?: PlaceHolder): Curry2<T1, T2, R>
  (t1: T1, t2?: PlaceHolder): Curry1<T2, R>
  (t1: PlaceHolder, t2: T2): Curry1<T1, R>
  (t1: T1, t2: T2): R
}

export interface Curry3<T1, T2 = T1, T3 = T1, R = T1> {
  (t1?: PlaceHolder): Curry3<T1, T2, T3, R>
  (t1: T1): Curry2<T2, T3, R>
  (t1?: PlaceHolder, t2?: PlaceHolder): Curry3<T1, T2, T3, R>
  (t1: T1, t2?: PlaceHolder): Curry2<T2, T3, R>
  (t1: PlaceHolder, t2: T2): Curry2<T1, T3, R>
  (t1: T1, t2: T2): Curry1<T3, R>
  (t1?: PlaceHolder, t2?: PlaceHolder, t3?: PlaceHolder): Curry3<T1, T2, T3, R>
  (t1: T1, t2?: PlaceHolder, t3?: PlaceHolder): Curry2<T2, T3, R>
  (t1: PlaceHolder, t2: T2, t3?: PlaceHolder): Curry2<T1, T3, R>
  (t1: PlaceHolder, t2: PlaceHolder, t3: T3): Curry2<T1, T2, R>
  (t1: T1, t2: T2, t3?: PlaceHolder): Curry1<T3, R>
  (t1: PlaceHolder, t2: T2, t3: T3): Curry1<T1, R>
  (t1: T1, t2: PlaceHolder, t3: T3): Curry1<T2, R>
  (t1: T1, t2: T2, t3: T3): R
}

export type Functor<T = any> = Iterable<T> | Iterator<T>
export type FunctorWithArLk<T = any> = Functor<T> | ArrayLike<T>

export type Func = ((...args: any[]) => any) & {[FUNCTION_LENGTH]?: number}

export type Obj<T = any> = {
  [key: string]: T
}

export type ObjArr<T = any> = {
  [key: string]: T | T[]
}

export type ObjRec<T = number> = {
  [key: string]: ObjRec | ObjArr | string | number | T
}

export type Comparator<T> = (a: T, b: T) => 1 | -1 | 0

export type RetPar1<T extends Func> = ReturnType<Parameters<T>[0]>
export type RetPar2<T extends Func> = ReturnType<Parameters<T>[1]>

export type ArrEl<T extends any[]> = T[number]

export type Pr<T extends Func> = Parameters<T>

export type Predicate1<T = any> = (v: T) => boolean

export type Tests<T = any> = {
  [key: string]: Predicate1<T>
}

export type FuncArr1<T, R> = (a: T) => R
