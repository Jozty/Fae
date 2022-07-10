import { isPlaceHolder } from './is_placeholder.ts';
import { _, UNDEFINED } from './constants.ts';
import type { Any, Func } from './types.ts';
import { setFunctionLength } from './set.ts';

function _curryN<A extends unknown[], R, This = Any>(
  totalArgs: number,
  received: A,
  original: Func<A, R, This>,
) {
  function f(this: This, ...passed: unknown[]) {
    const allArgs = [...received] as Parameters<Func<A, R>>;
    let allArgsI = 0;
    let i = 0;

    while (i < passed.length && allArgsI < totalArgs) {
      if (allArgs[allArgsI] !== UNDEFINED) {
        allArgsI++;
        continue;
      }
      if (!isPlaceHolder(passed[i])) allArgs[allArgsI] = passed[i];
      i++;
      allArgsI++;
    }
    return allArgs.every((r) => r !== UNDEFINED)
      ? original.apply(this, allArgs)
      : _curryN(totalArgs, allArgs, original);
  }

  let rem = received.filter((r) => r === UNDEFINED).length;

  setFunctionLength(f, rem);
  return f;
}

export default function curryN<A extends unknown[], R, This>(
  totalArgs: number,
  original: Func<A, R, This>,
) {
  const received = new Array(totalArgs).fill(UNDEFINED) as Parameters<
    Func<A, R>
  >;
  return _curryN(totalArgs, received, original);
}
