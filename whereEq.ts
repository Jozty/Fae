import curryN from "./utils/curry_n.ts"
import { Curry2, Obj } from "./utils/types.ts"
import where from "./where.ts"
import map from "./map.ts"
import curry from './curry.ts'

function whereEq(spec: Obj, testObj: Obj) {
  const equals = curry(2, (x: number, y: number) => x === y)
  return where(map(equals, spec), testObj)
}

export default curryN(2, whereEq) as Curry2<Obj, Obj, boolean>