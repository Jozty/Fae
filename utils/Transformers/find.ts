import { AbstractTransformer, ReducedTransformer } from './transformers.ts';
import type { Predicate1 } from '../types.ts';
import reduced from '../reduced.ts';

export default class FindTransformer<T> extends AbstractTransformer<T, T> {
  private found = false;
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
      this.found = true;
      result = reduced(this.transformer!.step(result, input));
    }
    return result;
  }

  result(result: T | ReducedTransformer<T>) {
    if (!this.found) result = this.transformer!.step(result, void 0);
    return this.transformer!.result(result);
  }
}
