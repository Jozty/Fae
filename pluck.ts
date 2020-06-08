import curryN from "./utils/curry_n.ts"
import { Curry3, Functor } from "./utils/types.ts"
import { map } from './map.ts'
import { prop } from './prop.ts'

function _pluck(p: number | string, list: Array<any> | Functor) {
  return map(prop(p), list)
}

export const pluck: Curry3<number | string, Array<any> | Functor> = curryN(2, _pluck)