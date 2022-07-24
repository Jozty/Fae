import { AbstractTransformer, ReducedTransformer } from './transformers.ts';
import type { Predicate2 } from '../types.ts';
import { equals } from '../../equals.ts';

export default class DropRepeatsWithTransformer<
  T,
> extends AbstractTransformer<T, T> {
  private last?: T;
  private seenFirst = false;
  private predicate: Predicate2<T>;

  constructor(pred: Predicate2<T>, transformer: AbstractTransformer<T, T>) {
    super(transformer);
    this.predicate = pred;
    this.last = undefined;
  }

  step(result: T | ReducedTransformer<T>, input: T) {
    let same = false;

    if (!this.seenFirst) this.seenFirst = true;
    else if (this.predicate(this.last!, input)) same = true;

    this.last = input;

    return same ? result : this.transformer!.step(result, input);
  }
}

export class DropRepeatsTransformer<
  T,
> extends DropRepeatsWithTransformer<T> {
  constructor(transformer: AbstractTransformer<T, T>) {
    super(equals, transformer);
  }
}
