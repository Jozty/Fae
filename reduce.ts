import { isArrayLike, isIterable, isIterator } from "./utils/is.ts"
import { getIterator, getTransformer } from "./utils/get.ts"
import curryN from "./utils/curry_n.ts"
import { Curry3, Func } from "./utils/types.ts"
import { Transformer } from "./utils/transformers.ts"

function _arrayReduce<T, R = T>(trans: Transformer, acc: R, list: ArrayLike<T>) {
  for(let i = 0, l = list.length; i < l; i++) {
    acc = trans.step(acc, list[i])
  }
  return trans.result(acc)
}

function _iterableReduce<T, R = T>(trans: Transformer, acc: R, it: Iterator<T>) {
  let step = it.next()
  while(!step.done) {
    acc = trans.step(acc, step.value)
    step = it.next()
  }
  return trans.result(acc)
}

function reduce<T, R = T>(func: Func | Transformer, acc: R, list: Iterable<T> | Iterator<T>) {
  let trans = getTransformer(func)
  if(isArrayLike(list)) return _arrayReduce(trans, acc, list)
  if(isIterable(list)) return _iterableReduce(trans, acc, getIterator<T>(list))
  if(isIterator(list)) return _iterableReduce(trans, acc, list)
}

export default curryN<typeof reduce>(3, reduce) as Curry3<Func | Transformer, any, Iterable<any> | Iterator<any>, any>
