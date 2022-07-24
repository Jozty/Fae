import { AbstractTransformer } from './Transformers/transformers.ts';
import type { Any, Func } from './types.ts';
import { isTransformer } from './is.ts';

export function dispatch<A extends unknown[], R, This = Any>(
  TR: new (...args: Any) => Any,
  func: Func<A, R, This>,
) {
  // @ts-ignore: TR is a general constructor
  if (TR.transform !== AbstractTransformer.transform) {
    throw new TypeError('TR must be child class Transform');
  }

  return function (this: This, ...args: A) {
    if (args.length === 0) return func.apply(this);

    const args2 = [...args];
    const obj = args2.pop();

    if (isTransformer(obj)) {
      return new TR(args[0], obj);
    }

    return func.apply(this, args);
  };
}
