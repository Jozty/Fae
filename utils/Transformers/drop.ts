import { AbstractTransformer, ReducedTransformer } from './transformers.ts';

export default class DropTransformer<T> extends AbstractTransformer<T> {
  private n: number;
  constructor(n: number, transformer: AbstractTransformer<T>) {
    super(transformer);
    this.n = n;
  }

  step(result: T | ReducedTransformer<T>, input: T) {
    if (this.n > 0) {
      this.n--;
      return result;
    }

    return this.transformer!.step(result, input);
  }
}
