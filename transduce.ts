import { Func } from "./utils/types.ts"
import Transformer from "./utils/Transformers/transformers.ts"
import reduce from './reduce.ts'
import { getTransformer } from "./utils/get.ts"

export default function transduce<T, L = T>(trans1: Func, trans2: Func | Transformer, acc: T, functor: L[]) {
  const trans = getTransformer(trans2)
  return reduce(trans1(trans), acc, functor)
}