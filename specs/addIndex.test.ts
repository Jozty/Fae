import { describe, expect, it } from './_describe.ts';
import { add, addIndex, map, multiply, reduce, sum } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('addIndex', () => {
  const list = [4, 'f', undefined, NaN, 5, Infinity, 10];

  const indexedMap = addIndex(map);

  const indexedReduce = addIndex(reduce);

  let sumArr = (tot: number, num: number, idx: number) => {
    return tot + num + idx;
  };

  let squareEnds = (x: any, idx: number, list: ArrayLike<any>) => {
    return idx === 0 || idx === list.length - 1 ? x * x : x;
  };

  it('should work as normal map function', () => {
    eq(indexedMap(multiply)(list), [
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
    eq(indexedMap(add)(list), [4, 'f1', NaN, NaN, 9, Infinity, 16]);
  });

  it('should pass params in order: iteratorFunc, index, list', () => {
    let makeSquareEnds = indexedMap(squareEnds);
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
