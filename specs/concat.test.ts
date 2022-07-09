import { describe, it } from './_describe.ts';
import { eq, thr } from './utils/utils.ts';
import { _, concat } from '../mod.ts';

describe('concat', () => {
  it('should concat two arrays', () => {
    eq(concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
    eq(concat([], ['c', 'd']), ['c', 'd']);
    eq(concat([1, 2], [3, 4]), [1, 2, 3, 4]);
    eq(concat([1, 2], ['a', 'b']), [1, 2, 'a', 'b']);
    eq(concat(['a'], [3, 4]), ['a', 3, 4]);
    eq(concat([{ a: 1, b: 2 }], [3, 4]), [{ a: 1, b: 2 }, 3, 4]);
  });

  it('should work on strings', () => {
    eq(concat('foo', 'bar'), 'foobar');
    eq(concat('x', ''), 'x');
    eq(concat('', 'x'), 'x');
    eq(concat('', ''), '');
  });

  it('should test curried versions too', () => {
    eq(concat(_, 'bar')('foo'), 'foobar');
    eq(concat(_, ['a'])(['c', 'd']), ['c', 'd', 'a']);
    eq(concat(_, [] as string[])(['c', 'd']), ['c', 'd']);
  });

  it('should throw error with incompatible types', () => {
    const message =
      'Types are not compatible. Both the arguments passed must be of same type.';
    // @ts-expect-error: different type of args are passed
    thr(() => concat('bar', ['a', 'foo']), message);
    // @ts-expect-error: different type of args are passed
    thr(() => concat(['a', 'foo'], 'bar'), message);
  });
});
