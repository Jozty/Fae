import { describe, it } from './_describe.ts';
import {
  _,
  append,
  dropLast,
  filter,
  flip,
  map,
  pipe,
  range,
  transduce,
} from '../mod.ts';
import { eq, strictNotEq } from './utils/utils.ts';

describe('dropLast', () => {
  it('should skip the last `n` elements from a list, returning the remainder', () => {
    eq(dropLast(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), [
      'a',
      'b',
      'c',
      'd',
    ]);
  });

  it('should return an empty array if `n` is too large', () => {
    eq(dropLast(20, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), []);
  });

  it('should returns an equivalent list if `n` is <= 0', () => {
    eq(dropLast(0, [1, 2, 3]), [1, 2, 3]);
    eq(dropLast(-1, [1, 2, 3]), [1, 2, 3]);
    eq(dropLast(-Infinity, [1, 2, 3]), [1, 2, 3]);
  });

  it('should never return the input array', () => {
    const xs = [1, 2, 3];

    strictNotEq(dropLast(0, xs), xs);
    strictNotEq(dropLast(-1, xs), xs);
  });

  it('can operate on strings', () => {
    eq(dropLast(3, 'transducer'), 'transdu');
  });

  it('can act as a transducer', () => {
    const inc = (x: number) => x + 1;
    const even = (x: number) => (x & 1) === 0;
    const arr = range(1, 20);

    const t1 = pipe(map(inc), filter(even), dropLast(5));

    eq(t1(arr), [2, 4, 6, 8, 10]);
    eq(transduce(t1, flip(append), [], arr), [3, 5, 7, 9, 11, 13, 15]);

    const t2 = pipe(filter(even), dropLast(3), map(inc));

    eq(t2(arr), [3, 5, 7, 9, 11, 13, 15]);
    eq(transduce(t2, flip(append), [], arr), [
      2,
      4,
      6,
      8,
      10,
      12,
      14,
      16,
      18,
    ]);

    const t3 = pipe(filter(even), dropLast(13), map(inc));

    eq(t3(arr), []);
    eq(transduce(t3, flip(append), [], arr), [2, 4, 6, 8]);
  });

  it('should work on curried versions', () => {
    const a = 3;
    const b = 'transducer';
    const expected = 'transdu';

    eq(dropLast(a, b), expected);
    eq(dropLast(a)(b), expected);
    eq(dropLast(_, b)(a), expected);
  });
});
