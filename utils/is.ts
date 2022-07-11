import type { Any, Func, Obj } from './types.ts';
import { AbstractTransformer } from './Transformers/transformers.ts';

export function is(x: unknown, type: string) {
  return Object.prototype.toString.call(x) === `[object ${type}]`;
}

export function isNumber(x: unknown): x is Number | number {
  return is(x, 'Number');
}

export function isString(x: unknown): x is string {
  return is(x, 'String');
}

export function isObject(x: unknown): x is Object {
  return is(x, 'Object');
}

export function isFunction<
  A extends Any[] = Any[],
  R = Any,
>(x: Func<A, R> | Obj | unknown[]): x is Func<A, R> {
  return is(x, 'Function') || typeof x === 'function';
}

export function isInteger(x: unknown): x is number {
  return Number.isInteger(x);
}

export function isArray<T = unknown>(x: unknown): x is Array<T> {
  return Array.isArray(x);
}

export function isArrayLike<T = unknown>(x: unknown): x is ArrayLike<T> {
  if (!x) return false;
  if (isArray(x)) return true;

  // @ts-ignore: check is there to ensure length property is there
  return typeof x === 'object' && 'length' in x && typeof x.length === 'number';
}

export function isIterable<T = unknown>(x: unknown): x is Iterable<T> {
  return Symbol.iterator in Object(x);
}

export function isIterator<T = unknown>(x: unknown): x is Iterator<T> {
  // @ts-ignore: check is there to ensure x is not null
  return !!x && typeof x === 'object' && isFunction(x?.next);
}

// deno-lint-ignore no-explicit-any
export function isTransformer(s: any): s is AbstractTransformer {
  return s instanceof AbstractTransformer;
}

export function isUndefinedOrNull(x: unknown): x is undefined | null {
  return x === void 0 || x === null || x === undefined;
}
export function isNotUndefinedOrNull(x: unknown) {
  return !isUndefinedOrNull(x);
}

export function isArguments(x: unknown) {
  return is(x, 'Arguments');
}
