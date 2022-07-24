import { AbstractTransformer, ReducedTransformer } from './transformers.ts';
import type { Func } from '../types.ts';

type MapTransformerFunc<T, R> =
  & Func<[T], R | ReducedTransformer<R>>
  & Func<[R | ReducedTransformer<R>, T], R | ReducedTransformer<R>>;

export default class MapTransformer<T, R> extends AbstractTransformer<R, T> {
  private f: MapTransformerFunc<T, R>;

  constructor(
    f: MapTransformerFunc<T, R>,
    transformer: AbstractTransformer<R, T>,
  ) {
    super(transformer);
    this.f = f;
  }

  step(result: R | ReducedTransformer<R>, input: T) {
    if (this.transformer) {
      return this.transformer.step(result, this.f(input));
    }

    return this.f(result, input);
  }
}
