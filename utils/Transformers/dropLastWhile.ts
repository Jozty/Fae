import { AbstractTransformer, ReducedTransformer } from './transformers.ts';
import type { Predicate1 } from '../types.ts';
import { reduce } from '../../reduce.ts';

export default class DropLastWhileTransformer<T>
  extends AbstractTransformer<T, T> {
  private buffer: T[] = [];
  private predicate: Predicate1<T>;
  constructor(p: Predicate1<T>, transformer: AbstractTransformer<T, T>) {
    super(transformer);
    this.predicate = p;
  }

  override result(acc: T | ReducedTransformer<T>) {
    return this.transformer!.result(acc);
  }

  step(result: T | ReducedTransformer<T>, input: T) {
    if (this.predicate(input)) return this.push(result, input);
    return this.flush(result, input);
  }

  flush(result: T | ReducedTransformer<T>, input: unknown) {
    result = reduce(this.transformer!.step, result, this.buffer);
    this.buffer = [];
    return this.transformer!.step(result, input);
  }

  push(result: T | ReducedTransformer<T>, input: T) {
    this.buffer.push(input);
    return result;
  }
}
