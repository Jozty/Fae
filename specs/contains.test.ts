import { describe, it } from './_describe.ts';
import { _, contains } from '../mod.ts';
import { eq } from './utils/utils.ts';
import type { Obj } from '../utils/types.ts';

describe('contains', () => {
  const list = [
    10,
    20,
    undefined,
    NaN,
    { a: 20, b: NaN, c: undefined } as Obj<number | undefined>,
    Infinity,
  ];

  const c = contains(_, list);

  it('should be declared correctly', () => {
    eq(c(10), true);
    eq(c(undefined), true);
    eq(c(NaN), false);
    eq(c(Infinity), true);
    eq(c({ b: NaN }), false);
    eq(c(200), false);
  });

  it('should work on curried versions', () => {
    const list = [1, 2, 3, 4, 8, 9, 10];

    eq(contains(10, list), true);
    eq(contains(10)(list), true);
    eq(contains(_, list)(10), true);
  });
});
