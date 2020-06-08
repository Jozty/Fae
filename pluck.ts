import curryN from "./utils/curry_n.ts"
import { Functor, Curry2 } from "./utils/types.ts"
import { map } from './map.ts'
import { prop } from './prop.ts'

function _pluck(p: number | string, list: Array<any> | Functor) {
  return map(prop(p), list)
}

export const pluck: Curry2<number | string, Array<any> | Functor> = curryN(2, _pluck)