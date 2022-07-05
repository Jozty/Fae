import { describe, it } from './_describe.ts';
import {
  _,
  append,
  dropWhile,
  filter,
  flip,
  map,
  pipe,
  range,
  transduce,
} from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('dropWhile', () => {
  it('should skip elements while the function reports `true`', () => {
    eq(
      dropWhile((x: number) => x < 5, [1, 3, 5, 7, 9]),
      [5, 7, 9],
    );
  });

  it('should return an empty list for an empty list', () => {
    eq(
      dropWhile(() => false, []),
      [],
    );
    eq(
      dropWhile(() => true, []),
      [],
    );
  });

  it('should starts at the right arg and acknowledges undefined', () => {
    const list = dropWhile((x: number | undefined) => x !== void 0, [
      1,
      3,
      void 0,
      5,
      7,
    ]);
    eq(list.length, 3);
    eq(list[0], void 0);
    eq(list[1], 5);
    eq(list[2], 7);
  });

  it('can operate on strings', () => {
    eq(
      dropWhile((x: string) => x !== 'n', 'acknowledges'),
      'nowledges',
    );
  });

  it('can act as a transducer', () => {
    const inc = (x: number) => x + 1;
    const even = (x: number) => (x & 1) === 0;
    const arr = range(1, 20);
    const less7 = (x: number) => x < 7;
    const less20 = (x: number) => x < 20;

    const t1 = pipe(map(inc), filter(even), dropWhile(less7));

    eq(t1(arr), [8, 10, 12, 14, 16, 18, 20]);
    eq(transduce(t1, flip(append), [], arr), [
      9,
      11,
      13,
      15,
      17,
      19,
      21,
    ]);

    const t2 = pipe(filter(even), dropWhile(less7), map(inc));

    eq(t2(arr), [9, 11, 13, 15, 17, 19, 21]);
    eq(transduce(t2, flip(append), [], arr), [
      8,
      10,
      12,
      14,
      16,
      18,
      20,
    ]);

    const t3 = pipe(filter(even), dropWhile(less20), map(inc));

    eq(t3(arr), [21]);
    eq(transduce(t3, flip(append), [], arr), [20]);
  });

  it('should work on curried versions', () => {
    const a = (x: string) => x !== 'd';
    const b = 'transducer';
    const expected = 'ducer';

    eq(dropWhile(a, b), expected);
    eq(dropWhile(a)(b), expected);
    eq(dropWhile(_, b)(a), expected);
  });
});
