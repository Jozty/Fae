import { _ as PH } from "./constants.ts"

type _ = typeof PH

export type Length<T extends any[]> = T['length']

export type Cast<X, Y> = X extends Y ? X : Y

export type HasTail<T extends any[]> = 
  T extends ([] | [any])
    ? false
    : true

export type IsEmpty<T extends any[]> = 
  T extends []
    ? true
    : false

export type Prepend<A, T extends any[]> = 
  ((firstArg: A, ...args: T) => any) extends ((..._: infer U) => any)
  ? U
  : T

export type Tail<T extends any[]> = 
  ((..._: T) => any) extends ((_: any, ...args: infer TT) => any)
    ? TT
    : []

export type Pos<I extends any[]> = Length<I>

export type Next<I extends any[]> = Prepend<any, I>

export type Prev<I extends any[]> = Tail<I>

export type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
  0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>
  1: R
}[Pos<I> extends Length<T> ? 1 : 0]

export type Drop<N extends number, T extends any[], I extends any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<any, I>>
  1: T
}[Length<I> extends N ? 1 : 0]

//@ts-ignore
export type Concat<T1 extends any[], T2 extends any[]> = Reverse<Cast<Reverse<T1>, any[]>, T2>

export type Append<E, T extends any[]> = Concat<T, [E]>

export type GapOf<T1 extends any[], T2 extends any[], TN extends any[], I extends any[]> =
  T1[Pos<I>] extends _
    ? Append<T2[Pos<I>], TN>
    : TN

export type GapsOf<T1 extends any[], T2 extends any[], TN extends any[] = [], I extends any[] = []> = {
  //@ts-ignore
  0: GapsOf<T1, T2, Cast<GapOf<T1, T2, TN, I>, any[]>, Next<I>>
  //@ts-ignore
  1: Concat<TN, Cast<Drop<Pos<I>, T2>, any[]>>
}[Pos<I> extends Length<T1> ? 1 : 0]

export type PartialGaps<T extends any[]> = {
  [K in keyof T]?: T[K] | _
}

export type CleanedGaps<T extends any[]> = {
  [K in keyof T]: NonNullable<T[K]>
}

export type Gaps<T extends any[]> = CleanedGaps<PartialGaps<T>>
