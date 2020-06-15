import { Pos, Next, Length } from "./iteration.ts"
import { Cast } from "./any.ts"

export type Tail<T extends any[]> = 
  ((...t: T) => any) extends ((a: any, ...args: infer TT) => any)
    ? TT
    : []

export type Prepend<A, T extends any[]> = 
  ((firstArg: A, ...args: T) => any) extends ((..._: infer U) => any)
    ? U
    : T

// @ts-ignore
export type Concat<T1 extends any[], T2 extends any[]> = Reverse<Cast<Reverse<T1>, any[]>, T2>

export type Append<E, T extends any[]> = Concat<T, [E]>


export type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
  0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>
  1: R
}[Pos<I> extends Length<T> ? 1 : 0]

export type Drop<N extends number, T extends any[], I extends any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<any, I>>
  1: T
}[Length<I> extends N ? 1 : 0]

