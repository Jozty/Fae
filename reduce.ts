import { isArrayLike, isIterable, isIterator, isTransformer } from "./utils/is.ts"
import { getIterator } from "./utils/get.ts"
import curryN from "./utils/curry_n.ts"
import { Curry3, Func } from "./utils/types.ts"
import { Transformer } from "./utils/transformers.ts"

function _arrayReduce<T, R = T>(trans: Transformer, list: ArrayLike<T>, acc: R) {
  for(let i = 0, l = list.length; i < l; i++) {
    acc = trans.step(acc, list[i])
  }
  return trans.result(acc)
}

function _iterableReduce<T, R = T>(trans: Transformer, it: Iterator<T>, acc: R) {
  let step = it.next()
  while(!step.done) {
    acc = trans.step(acc, step.value)
    step = it.next()
  }
  return trans.result(acc)
}

function reduce<T, R = T>(func: Func | Transformer, list: Iterable<T> | Iterator<T>, acc: R) {
  let trans: Transformer
  if(!isTransformer(func)) trans = new Transformer(func)
  else trans = func
  if(isArrayLike(list)) return _arrayReduce(trans, list, acc)
  if(isIterable(list)) return _iterableReduce(trans, getIterator<T>(list), acc)
  if(isIterator(list)) return _iterableReduce(trans, list, acc)
}

export default curryN<typeof reduce>(3, reduce) as Curry3<Func | Transformer, Iterable<any> | Iterator<any>, any, any>
