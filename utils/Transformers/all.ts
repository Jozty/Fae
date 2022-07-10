import { AbstractTransformer, ReducedTransformer } from './transformers.ts';
import type { Predicate1 } from '../types.ts';
import reduced from '../reduced.ts';

export default class AllTransformer<T> extends AbstractTransformer<boolean, T> {
  private all = true;
  private predicate: Predicate1<T>;

  constructor(
    predicate: Predicate1<T>,
    transformer: AbstractTransformer<boolean, T>,
  ) {
    super(transformer);
    this.predicate = predicate;
  }

  override result(acc: boolean | ReducedTransformer<boolean>) {
    if (this.all) {
      acc = this.transformer!.step(acc, true);
    }

    return this.transformer!.result(acc);
  }

  step(result: boolean | ReducedTransformer<boolean>, input: T) {
    if (!this.predicate(input)) {
      this.all = false;
      return reduced(this.transformer!.step(result, false));
    }

    return result;
  }
}
