import { _, FUNCTION_LENGTH } from './constants.ts';

// deno-lint-ignore no-explicit-any
export type Any = any;

/** Type of placeholder for curried functions */
export type PlaceHolder = typeof _;
export type PH = PlaceHolder;

/** Function type for curried function of arity 1 */
export interface Curry1<T, R = T> {
  (a: T): R;
}

/** Function type for curried function of arity 2 */
export interface Curry2<T1, T2 = T1, R = T1> {
  (t1: T1): Curry1<T2, R>;
  (t1: PlaceHolder, t2: T2): Curry1<T1, R>;
  (t1: T1, t2: T2): R;
}

/** Function type for curried function of arity 3 */
export interface Curry3<T1, T2 = T1, T3 = T1, R = T1> {
  (t1: T1): Curry2<T2, T3, R>;
  (t1: PlaceHolder, t2: T2): Curry2<T1, T3, R>;
  (t1: PlaceHolder, t2: PlaceHolder, t3: T3): Curry2<T1, T2, R>;
  (t1: T1, t2: T2): Curry1<T3, R>;
  (t1: PlaceHolder, t2: T2, t3: T3): Curry1<T1, R>;
  (t1: T1, t2: PlaceHolder, t3: T3): Curry1<T2, R>;
  (t1: T1, t2: T2, t3: T3): R;
}

export type Functor<T> = Iterable<T> | Iterator<T>;
export type FunctorWithArLk<T = unknown> = Functor<T> | ArrayLike<T>;

export type Func<A extends unknown[] = unknown[], R = unknown, This = unknown> =
  & ((this: This, ...args: A) => R)
  & {
    [FUNCTION_LENGTH]?: number;
  };

export type EmptyObj = Record<never, never>;

export type Obj<T = unknown> = Record<string | number, T>;

export type ObjArr<T = unknown> = Record<string | number, T | T[]>;

export type ObjRec<T = unknown> = Record<
  string | number,
  ObjArr | string | number | null | undefined | T
>;

/** Comparator for functions like `sort` */
export type Comparator<T> = (a: T, b: T) => 1 | -1 | 0;

export type ArrEl<T extends unknown[]> = T[number];

export type Pr<T extends Func> = Parameters<T>;

export type Predicate<T = unknown> = (...args: T[]) => boolean;

/** Predicate function type which checks one value `v` */
export type Predicate1<T = unknown> = (v: T) => boolean;

/** Predicate function type which applies on two values `a` and `b` */
export type Predicate2<T1, T2 = T1> = (a: T1, b: T2) => boolean;

/** Type for spec object which contains predicate functions of type {Predicate1} */
export type Tests<T> = Record<string | number, Predicate1<T>>;

export type InferPrimitive<T> = T extends number ? number
  : T extends string ? string
  : T;

export type InferType<T> = T extends string ? string
  : T extends (infer U)[] ? U[]
  : T extends ArrayLike<infer U> ? ArrayLike<U>
  : never;

export type InferElementType<T> = T extends string ? string
  : T extends (infer U)[] ? U
  : T extends ArrayLike<infer U> ? U
  : never;

export type FuncArr1<T, R> = Func<[T], R>;
export type FuncArr2<T1, T2, R> = Func<[T1, T2], R>;

/** All the types which are returned by function `typ` */
export type AllTypes =
  | 'Null'
  | 'Undefined'
  | 'Object'
  | 'Number'
  | 'Boolean'
  | 'String'
  | 'Array'
  | 'RegExp'
  | 'Function'
  | 'Arguments'
  | 'Date'
  | 'Error'
  | 'Map'
  | 'Set'
  | 'WeakMap'
  | 'WeakSet'
  | 'Int8Array'
  | 'Uint8Array'
  | 'Uint8ClampedArray'
  | 'Int16Array'
  | 'Uint16Array'
  | 'Int32Array'
  | 'Uint32Array'
  | 'Float32Array'
  | 'Float64Array'
  | 'ArrayBuffer';
