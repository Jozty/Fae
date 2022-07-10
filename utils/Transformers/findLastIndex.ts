import { AbstractTransformer, ReducedTransformer } from './transformers.ts';
import type { Predicate1 } from '../types.ts';

export default class FindLastIdxTransformer<T>
  extends AbstractTransformer<number, T> {
  private last = -1;
  private i = 0;
  private predicate: Predicate1<T>;
  constructor(
    predicate: Predicate1<T>,
    transformer: AbstractTransformer<number, T>,
  ) {
    super(transformer);
    this.last = -1;
    this.predicate = predicate;
  }

  step(result: number | ReducedTransformer<number>, input: T) {
    if (this.predicate(input)) {
      this.last = this.i;
    }

    this.i++;
    return result;
  }

  override result(result: number | ReducedTransformer<number>) {
    return this.transformer!.result(
      this.transformer!.step(result, this.last),
    );
  }
}
