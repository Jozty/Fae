import { AssertionError, assertStrictEquals, expect } from '../_describe.ts';

export function exactType<T>(_actual: T, _expected: T) {
}

export function eq<T>(actual: T, expected: T) {
  expect(actual).toEqual(expected);
}

export function noEq<T>(actual: T, expected: T) {
  expect(actual).not.toEqual(expected);
}

export function strictEq<T1, T2>(actual: T1, expected: T2) {
  assertStrictEquals(actual, expected);
}
export function strictNotEq<T1, T2>(actual: T1, expected: T2) {
  // @ts-ignore: T1 and T2 can be of same type
  if (actual !== expected) return;
  throw new AssertionError('The objects passes has same reference');
}

export function thr(func: Function, expected: unknown) {
  let f = true;
  try {
    func();
    f = false;
  } catch (e) {
    eq(e.message, expected);
  }
  if (!f) throw new Error('No Error Throw');
}
