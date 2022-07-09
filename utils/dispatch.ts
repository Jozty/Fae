import type Transformer from './Transformers/transformers.ts';
import type { Func } from './types.ts';
import { isTransformer } from './is.ts';

export function dispatch(TR: typeof Transformer, func: Func) {
  return function (this: any, ...args: any[]) {
    if (args.length === 0) return func();

    const args2 = [...args];
    const obj = args2.pop();
    if (isTransformer(obj)) {
      return new TR(args[0], obj);
    }
    return func.apply(this, args);
  };
}
