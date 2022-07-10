import type { Func } from '../types.ts';

export abstract class AbstractTransformer<A = unknown, I = unknown> {
  protected transformer?: AbstractTransformer<A>;
  static transform = Symbol('Transformer');

  constructor(transformer?: AbstractTransformer<A>) {
    this.transformer = transformer;
    this.init = this.init.bind(this);
    this.result = this.result.bind(this);
    this.step = this.step.bind(this);
  }

  init(): A | ReducedTransformer<A> {
    return this.transformer!.init();
  }

  result(acc: A | ReducedTransformer<A>): A | ReducedTransformer<A> {
    return this.transformer ? this.transformer.result(acc) : acc;
  }

  abstract step(
    result: A | ReducedTransformer<A>,
    input: I,
  ): A | ReducedTransformer<A>;
}

type TransformerFunc<T, R> =
  & Func<[T], R | ReducedTransformer<R>>
  & Func<[R | ReducedTransformer<R>, T], R | ReducedTransformer<R>>;

export class Transformer<A, I> extends AbstractTransformer<A, I> {
  private f: TransformerFunc<I, A>;

  constructor(
    f: TransformerFunc<I, A>,
    transformer?: AbstractTransformer<A, I>,
  ) {
    super(transformer);
    this.f = f;
  }

  step(result: A | ReducedTransformer<A>, input: I) {
    if (this.transformer) {
      return this.transformer.step(result, this.f(input));
    }

    return this.f(result, input);
  }
}

export class ReducedTransformer<A> {
  private _value: A;

  constructor(value: A) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
}
