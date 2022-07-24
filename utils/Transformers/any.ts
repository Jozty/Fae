import { AbstractTransformer, ReducedTransformer } from './transformers.ts';
import reduced from '../reduced.ts';
import type { Predicate1 } from '../../utils/types.ts';

export default class AnyTransformer<T> extends AbstractTransformer<boolean, T> {
  private anyPassed = false;
  private predicate: Predicate1<T>;

  constructor(
    predicate: Predicate1<T>,
    transformer: AbstractTransformer<boolean, T>,
  ) {
    super(transformer);
    this.predicate = predicate;
  }

  override result(acc: boolean | ReducedTransformer<boolean>) {
    if (!this.anyPassed) {
      acc = this.transformer!.step(acc, false);
    }
    return this.transformer!.result(acc);
  }

  step(result: boolean | ReducedTransformer<boolean>, input: T) {
    if (this.predicate(input)) {
      this.anyPassed = true;
      result = reduced(this.transformer!.step(result, true));
    }
    return result;
  }
}
