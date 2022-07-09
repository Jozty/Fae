import { describe, it } from './_describe.ts';
import { tail } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('tail', () => {
  it('should return the tail of an ordered collection', () => {
    eq(tail([1, 2, 3]), [2, 3]);
    eq(tail([2, 3]), [3]);
    eq(tail([3]), []);
    eq(tail([]), []);

    eq(tail('abc'), 'bc');
    eq(tail('bc'), 'c');
    eq(tail('c'), '');
    eq(tail(''), '');

    eq(tail([undefined, 1, '', { a: 12 }, [1, 2]]), [
      1,
      '',
      { a: 12 },
      [1, 2],
    ]);

    const arr = new Array(100000).fill(0).map((_, i) => i);
    const arr2 = [...arr];
    const expected = [...arr];
    expected.shift();
    eq(tail(arr), expected);
    eq(arr, arr2); // should not mutate original

    const arr3 = ['12345678', 'asdfghjk', [1, 2, 3, 4, 4]];
    const expected3 = ['sdfghjk', [2, 3, 4, 4]];
    eq(tail(arr3.map(tail)), expected3);
  });

  it('should work with array-likes', () => {
    const arr = {
      0: 1,
      1: 2,
      2: 3,
      3: 4,
      length: 4,
    };

    const expected = [2, 3, 4];

    eq(tail(arr), expected);
  });
});
