import { describe, it } from './_describe.ts';
import { _, filter, map, zip } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('zip', () => {
  it('should return an array of "tuples"', () => {
    const a = [1, 2, 3];
    const b = [100, 200, 300];
    function multiply3(x: number) {
      return 3 * x;
    }

    eq(zip(a, b), [
      [1, 100],
      [2, 200],
      [3, 300],
    ]);

    eq(zip(a)(b), [
      [1, 100],
      [2, 200],
      [3, 300],
    ]);

    eq(zip(map(multiply3)(a) as number[], b), [
      [3, 100],
      [6, 200],
      [9, 300],
    ]);
  });

  it('should return a list truncated to the length of shorter of the two input lists', () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const b = [100, 200, 300, 400];
    const c = [10, 20];
    const d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    function even(x: number) {
      return x % 2 === 0;
    }

    eq(zip(a, b), [
      [1, 100],
      [2, 200],
      [3, 300],
      [4, 400],
    ]);
    eq(zip(b, c), [
      [100, 10],
      [200, 20],
    ]);
    eq(zip(filter(even)(a) as number[], b), [
      [2, 100],
      [4, 200],
      [6, 300],
      [8, 400],
    ]);
  });

  it('should test curried versions too', () => {
    const a = [1, 2, 3];
    const b = [100, 200];

    eq(zip(a)(b), [
      [1, 100],
      [2, 200],
    ]);
    eq(zip(_, b)(a), [
      [1, 100],
      [2, 200],
    ]);
    eq(zip(b, a), [
      [100, 1],
      [200, 2],
    ]);
  });
});
