import { describe, expect, it } from './_describe.ts';
import { add, addIndex, map, multiply, reduce } from '../mod.ts';
import { eq } from './utils/utils.ts';
import type { Curry2, Func } from '../utils/types.ts';

describe('addIndex', () => {
  const list = [4, 'f', undefined, NaN, 5, Infinity, 10];

  type El = (typeof list)[number];

  const indexedMap = addIndex(map) as Curry2<
    Func<[El, number, El[]], El>,
    El[],
    El[]
  >;

  const indexedReduce = addIndex(reduce);

  let sumArr = (tot: number, num: number, idx: number) => {
    return tot + num + idx;
  };

  let squareEnds = (x: El, idx: number, list: El[]) => {
    // @ts-expect-error: x may be non-number too
    return idx === 0 || idx === list.length - 1 ? x * x : x;
  };

  const multiplyNonNumber = multiply as Func<[El, number], El>;
  const addNonNumber = add as Func<[El, number], El>;

  it('should work as normal map function', () => {
    eq(indexedMap(multiplyNonNumber)(list), [
      0,
      NaN,
      NaN,
      NaN,
      20,
      Infinity,
      60,
    ]);
  });

  it('should pass second param as index', () => {
    eq(indexedMap(addNonNumber)(list), [4, 'f1', NaN, NaN, 9, Infinity, 16]);
  });

  it('should pass params in order: iteratorFunc, index, list', () => {
    const makeSquareEnds = indexedMap(squareEnds);

    eq(makeSquareEnds(list), [
      16,
      'f',
      undefined,
      NaN,
      5,
      Infinity,
      100,
    ]);
  });

  it('should work with binary func also correctly', () => {
    eq(indexedReduce(sumArr, 0, [1, 2, 3, 4, 5]), 25);
  });
});
