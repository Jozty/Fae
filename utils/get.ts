import type { Func } from './types.ts';
import { FUNCTION_LENGTH } from './constants.ts';
import { isTransformer, isUndefinedOrNull } from './is.ts';
import Transformer from './Transformers/transformers.ts';

export function getIterator<T = any>(iterable: Iterable<T>) {
  return iterable[Symbol.iterator]();
}

export function getIterable<T = any>(iterator: Iterator<T>) {
  return {
    [Symbol.iterator]: () => iterator,
  };
}

export function getFunctionLength(func: Func): number {
  return func.length || func[FUNCTION_LENGTH] || 0;
}

export function getFunctionsLengths(functions: Func[]): number[] {
  return functions.map(getFunctionLength);
}

export function getTransformer(
  func: Func | Transformer,
): Transformer {
  return isTransformer(func) ? func : new Transformer(func);
}

export function getFunctionName(f: Func) {
  const name = String(f).match(/^function (\w*)/);
  return isUndefinedOrNull(name) ? '' : name[1];
}
