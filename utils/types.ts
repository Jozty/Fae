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
  (t1: PlaceHolder, t2: T2, t3: T1): Curry1<T1, R>
  (t1: T1, t2: PlaceHolder, t3: T3): Curry1<T2, R>
  (t1: T1, t2: T2, t3: T3): R
}

export type Functor<T> = Iterable<T> | Iterator<T>

export type Func = ((...args: any[]) => any) & {[FUNCTION_LENGTH]?: number}

export type Obj<T = any> = {
  [key: string]: T
}
