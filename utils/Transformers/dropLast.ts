import { AbstractTransformer, ReducedTransformer } from './transformers.ts';

export default class DropLastTransformer<T> extends AbstractTransformer<T, T> {
  private n: number;
  private unTracked: T[];
  private i = 0;
  private full = false;

  constructor(n: number, transformer: AbstractTransformer<T, T>) {
    super(transformer);
    this.n = n;
    this.unTracked = new Array(n);
  }

  override result(acc: T | ReducedTransformer<T>) {
    return this.transformer!.result(acc);
  }

  step(result: T | ReducedTransformer<T>, input: T) {
    if (this.full) {
      result = this.transformer!.step(result, this.unTracked[this.i]);
    }

    this.store(input);
    return result;
  }

  private store(input: T) {
    this.unTracked[this.i++] = input;

    if (this.i === this.unTracked.length) {
      this.i = 0;
      this.full = true;
    }
  }
}
