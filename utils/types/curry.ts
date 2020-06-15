import { Append, Drop, Concat } from "./list.ts"
import { Pos, Length, Next, Iter } from "./iteration.ts"
import { Cast } from "./any.ts"
import { _ as PH } from '../constants.ts'

// const PH = {}
type _ = typeof PH

export type GapOf<T1 extends any[], T2 extends any[], TN extends any[], I extends any[]> =
  T1[Pos<I>] extends _
    ? Append<T2[Pos<I>], TN>
    : TN


export type GapsOf<T1 extends any[], T2 extends any[], TN extends any[] = [], I extends any[] = []> = {
  //@ts-ignore
  0: GapsOf<T1, T2, Cast<GapOf<T1, T2, TN, I>, any[]>, Next<I>>
  // @ts-ignore
  1: Concat<TN, Cast<Drop<Pos<I>, T2>, any[]>>
}[Pos<I> extends Length<T1> ? 1 : 0]

export type PartialGaps<T extends any[]> = {
  [K in keyof T]?: T[K] | _
}


export type CleanedGaps<T extends any[]> = {
  [K in keyof T]: NonNullable<T[K]>
}

export type Gaps<T extends any[]> = CleanedGaps<PartialGaps<T>>


export type Curry<F extends ((...args: any) => any)> = 
  <T extends any[]>(...args: Cast<Cast<T, Gaps<Parameters<F>>>, any[]>) =>
    GapsOf<T, Parameters<F>> extends [any]
    //@ts-ignore
      ? Curry<(...args: Cast<GapsOf<T, Parameters<F>>, any[]>) => ReturnType<F>>
      : ReturnType<F>
