import { AbstractTransformer, ReducedTransformer } from './transformers.ts';
import type { Predicate1 } from '../types.ts';

export default class FilterTransformer<T> extends AbstractTransformer<T, T> {
  private predicate: Predicate1<T>;

  constructor(f: Predicate1<T>, transformer: AbstractTransformer<T, T>) {
    super(transformer);
    this.predicate = f;
  }

  step(result: T | ReducedTransformer<T>, input: T) {
    return this.predicate(input)
      ? this.transformer!.step(result, input)
      : result;
  }
}
