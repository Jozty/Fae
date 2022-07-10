import { AbstractTransformer, ReducedTransformer } from './transformers.ts';
import type { Predicate1 } from '../types.ts';

export default class DropWhileTransformer<T> extends AbstractTransformer<T, T> {
  private skippingDone = false;
  private predicate: Predicate1<T>;

  constructor(
    predicate: Predicate1<T>,
    transformer: AbstractTransformer<T, T>,
  ) {
    super(transformer);
    this.predicate = predicate;
  }

  step(result: T | ReducedTransformer<T>, input: T) {
    if (!this.skippingDone) {
      if (this.predicate(input)) return result;
      this.skippingDone = true;
    }

    return this.transformer!.step(result, input);
  }
}
