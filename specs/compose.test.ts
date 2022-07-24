import { describe, it } from './_describe.ts';
import { eq } from './utils/utils.ts';
import { compose, dec, filter, inc, map, take, tap } from '../mod.ts';
import type { Curry2, Func, FuncArr1 } from '../utils/types.ts';

describe('compose', () => {
  const even = (a: number) => (a & 1) === 0;
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  it('should do function composition', () => {
    const c1 = compose(take(3), filter(even), map(inc)) as Func<
      [number[]],
      number[]
    >;
    eq(c1(arr), [2, 4, 6]);

    const c2 = compose(take(3), filter(even), map) as Curry2<
      FuncArr1<number, number>,
      number[],
      number[]
    >;
    eq(c2(inc)(arr), [2, 4, 6]);

    let y: unknown;
    const c3 = compose(
      take(3),
      filter(even),
      tap((x: unknown) => (y = x)),
      map,
    ) as Curry2<FuncArr1<number, number>, number[], number[]>;

    eq(c3(dec)(arr), [0, 2, 4]);
    eq(y, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
