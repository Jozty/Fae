import { describe, it } from './_describe.ts';
import { _, median } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('median', () => {
  it('should return middle value of an odd-length list', () => {
    eq(median([2]), 2);
    eq(median([2, 9, 7]), 7);
    eq(median([-2, -9, 7]), -2);
    eq(median([-2.5, -8.9, 7.1]), -2.5);
    eq(median([Infinity, 3, 5]), 5);
    eq(median([Infinity, Infinity, Infinity]), Infinity);
    eq(median([Infinity, -Infinity, 5]), 5);
    eq(median([Infinity, NaN, -Infinity]), NaN);
    eq(median([Infinity, Infinity, 5]), Infinity);
    eq(median([-Infinity, -Infinity, 5]), -Infinity);
    eq(median([Infinity, Infinity, NaN]), Infinity);
  });

  it('should return mean of two middle values of a nonempty even-length list', () => {
    eq(median([10, 20]), 15);
    eq(median([7, 2, 10, 9]), 8);
    eq(median([10.4, 10.4]), 10.4);
    eq(median([7.5, 2.8, -10.6, 9]), 5.15);
    eq(median([1000000, 100000, 0.23492, 999999]), 549999.5);
    eq(median([Infinity, 3, 8, 5]), 6.5);
    eq(median([Infinity, Infinity]), Infinity);
    eq(median([Infinity, -Infinity]), NaN);
    eq(median([Infinity, NaN]), Infinity);
    eq(median([Infinity, 5]), Infinity);
    eq(median([-Infinity, -Infinity]), -Infinity);
    eq(median([Infinity, Infinity, NaN, -Infinity]), Infinity);
  });

  it('should return NaN for an empty list', () => {
    eq(median([]), NaN);
  });

  it('should return median of list with NaNs, if present, filtered out', () => {
    eq(median([2, 5, NaN, NaN, 8]), 5);
    eq(median([NaN, NaN, NaN, NaN]), NaN);
    eq(median([2, 4, NaN]), 3);
    eq(median([2, 5, NaN, NaN]), 3.5);
  });
});
