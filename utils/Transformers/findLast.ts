import { AbstractTransformer, ReducedTransformer } from './transformers.ts';
import type { Predicate1 } from '../types.ts';

export default class FindLastTransformer<
  T,
> extends AbstractTransformer<T, T> {
  private last?: T;
  private predicate: Predicate1<T>;
  constructor(
    predicate: Predicate1<T>,
    transformer: AbstractTransformer<T, T>,
  ) {
    super(transformer);
    this.predicate = predicate;
  }

  step(result: T | ReducedTransformer<T>, input: T) {
    if (this.predicate(input)) {
      this.last = input;
    }

    return result;
  }

  override result(result: T | ReducedTransformer<T>) {
    return this.transformer!.result(
      this.transformer!.step(result, this.last),
    );
  }
}
