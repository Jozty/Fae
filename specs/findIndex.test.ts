import { describe, it } from './_describe.ts';
import { _, equals, findIndex } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('findIndex', () => {
  const obj1 = { x: 10 };
  const a = [2, 4, obj1, 3, 12, 25, obj1, 'Foo', undefined, 21];
  const b = [2, 4, 3, 12, 25, 21, -10];
  const isNegative = (x: (typeof a)[number]) =>
    (typeof x) === 'number' && x! < 0;

  it('should return the index of the first element that satisfies the predicate', function () {
    eq(findIndex(equals(3), a), 3);
    // @ts-ignore
    eq(findIndex(equals(undefined), a), 8);
    eq(findIndex(equals('Foo'), a), 7);
    eq(findIndex(equals(obj1), a), 2);
  });

  it('should return -1 when no element satisfies the predicate', function () {
    eq(findIndex((x: string) => x.length >= 4, ['Bar', 'foo']), -1);
    eq(findIndex(isNegative, a), -1);
  });

  it('should return the curried versions too', function () {
    eq(findIndex(isNegative)(a), -1);
    eq(findIndex(_, b)(isNegative), 6);
    eq(findIndex(isNegative, a), -1);
  });
});
