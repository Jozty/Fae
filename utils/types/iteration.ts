import { Prepend, Tail } from "./list.ts"

export type Length<T extends any[]> = T['length']

export type Pos<I extends any[]> = Length<I>

export type Next<I extends any[]> = Prepend<any, I>

export type Prev<I extends any[]> = Tail<I>

export type Iter<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
  0: Iter<Index, Next<From>, Next<I>>
  1: From
}[Pos<I> extends Index ? 1 : 0]
