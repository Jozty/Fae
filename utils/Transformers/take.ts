import { AbstractTransformer, ReducedTransformer } from './transformers.ts';
import reduced from '../reduced.ts';

export default class TakeTransformer<T> extends AbstractTransformer<T, T> {
  private i: number;
  private n: number;
  constructor(n: number, transformer: AbstractTransformer<T, T>) {
    super(transformer);
    this.n = n;
    this.i = 0;
  }

  step(result: T | ReducedTransformer<T>, input: T) {
    this.i++;

    const ret = this.n === 0 ? result : this.transformer!.step(result, input);

    return this.n >= 0 && this.i >= this.n ? reduced(ret) : ret;
  }
}
