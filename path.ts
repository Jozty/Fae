import { ObjRec, Curry2 } from "./utils/types.ts"
import paths from './paths.ts'
import curryN from "./utils/curry_n.ts"

function path(ps: string | Array<string | number>, obj: ObjRec) {
  return paths([ps], obj)[0]
}

export default curryN(2, path) as Curry2<string | Array<string | number>, ObjRec>
