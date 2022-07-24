import { isFunction } from './is.ts';
import type { Any } from './types.ts';

// TODO: (singla-shivam) change toString function

export function assertPromise(
  name: string,
  p: Any,
): p is PromiseLike<unknown> {
  if (p == null || !isFunction(p.then)) {
    throw new TypeError(
      '`' + name + '` expected a Promise, received ' + p.toString(),
    );
  }
  return true;
}
