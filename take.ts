import slice from './slice.ts'
import { dispatch } from './utils/dispatch.ts'
import TakeTransformer from './utils/Transformers/take.ts'
import curryN from './utils/curry_n.ts'
import { Curry2 } from './utils/types.ts'

function take<T>(n: number, list: T[] | string) {
  return slice(0, n < 0 ? Infinity : n, list)
}

const dispatchedTake = dispatch(TakeTransformer as any, take)

export default curryN(2, dispatchedTake) as Curry2<number, any[] | string, any[] | string>
