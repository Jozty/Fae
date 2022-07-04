import { isFunction } from './is.ts';

// TODO: (singla-shivam) change toString function

export function assertPromise(
  name: string,
  p: any,
): p is PromiseLike<any> {
  if (p == null || !isFunction(p.then)) {
    throw new TypeError(
      '`' + name + '` expected a Promise, received ' + p.toString(),
    );
  }
  return true;
}
