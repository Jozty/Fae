import { AbstractTransformer, ReducedTransformer } from './transformers.ts';
import type { Func } from '../types.ts';

export default class TapTransformer<T> extends AbstractTransformer<T, T> {
  private f: Func<[T], void>;

  constructor(f: Func<[T], void>, transformer: AbstractTransformer<T, T>) {
    super(transformer);
    this.f = f;
  }

  step(result: T | ReducedTransformer<T>, input: T) {
    this.f(input);
    return this.transformer ? this.transformer.step(result, input) : result;
  }
}
