import { ReducedTransformer } from './Transformers/transformers.ts'

export default function reduced<T>(x: T | ReducedTransformer<T>) {
  return x instanceof ReducedTransformer
    ? x
    : new ReducedTransformer(x)
}
