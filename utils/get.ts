import type { Func } from './types.ts';
import { FUNCTION_LENGTH } from './constants.ts';
import { isTransformer, isUndefinedOrNull } from './is.ts';
import {
  AbstractTransformer,
  Transformer,
  TransformerFunc,
} from './Transformers/transformers.ts';

export function getIterator<T = unknown>(iterable: Iterable<T>) {
  return iterable[Symbol.iterator]();
}

export function getIterable<T = unknown>(iterator: Iterator<T>) {
  return {
    [Symbol.iterator]: () => iterator,
  };
}

export function getFunctionLength<A extends unknown[], R, This>(
  func: Func<A, R, This>,
): number {
  return func.length || func[FUNCTION_LENGTH] || 0;
}

export function getFunctionsLengths<A extends unknown[], R>(
  functions: Func<A, R>[],
): number[] {
  return functions.map(getFunctionLength);
}

export function getTransformer<R, T>(
  func: TransformerFunc<R, T> | AbstractTransformer<R, T>,
): AbstractTransformer<R, T> {
  return isTransformer(func)
    ? (func as AbstractTransformer<R, T>)
    : new Transformer<R, T>(func);
}

export function getFunctionName(f: Func) {
  const name = String(f).match(/^function (\w*)/);
  return isUndefinedOrNull(name) ? '' : name[1];
}
