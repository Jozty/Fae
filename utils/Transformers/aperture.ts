import { AbstractTransformer, ReducedTransformer } from './transformers.ts';

export default class ApertureTransformer<
  T,
> extends AbstractTransformer<T[][], T> {
  private n: number;
  private i = 0;
  private buffer: T[];
  private full = false;

  constructor(n: number, transformer: AbstractTransformer<T[][], T>) {
    super(transformer);
    this.n = n;
    this.buffer = new Array(n);
  }

  step(result: T[][] | ReducedTransformer<T[][]>, input: T) {
    this.store(input);
    return this.full ? this.transformer!.step(result, this.copy) : result;
  }

  store(input: T) {
    this.buffer[this.i++] = input;
    if (this.i === this.n) {
      this.i = 0;
      this.full = true;
    }
  }

  get copy() {
    return this.buffer
      .slice(this.i)
      .concat(this.buffer.slice(0, this.i));
  }
}
