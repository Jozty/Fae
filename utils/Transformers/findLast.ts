import Transformer from './transformers.ts';
import type { Func } from '../types.ts';

export default class FindLastTransformer<
  T = any,
> extends Transformer {
  private last: T;
  constructor(f: Func, transformer: Transformer) {
    super(f, transformer);
    this.last = undefined as any;
  }

  step(result: any, input: any) {
    if (this.f(input)) {
      this.last = input;
    }
    return result;
  }

  result(result: any) {
    return this.transformer!.result(
      this.transformer!.step(result, this.last),
    );
  }
}
