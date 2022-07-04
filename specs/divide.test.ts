import { describe, expect, it } from './_describe.ts';
import { _, divide } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('divide', () => {
  it('should divide two numbers', () => {
    eq(divide(25, 5), 5);
    eq(divide(25, 4), 6.25);
    eq(divide(NaN, 10), NaN);
    eq(divide(Infinity, 4), Infinity);
    eq(divide(25, Infinity), 0);
    eq(divide(Infinity, Infinity), NaN);
    eq(divide(0, 0), NaN);
    eq(divide(25, 0), Infinity);
    eq(divide(25)(10), 2.5);
  });

  it('should test curried versions too', () => {
    eq(divide(25)(5), 5);
    eq(divide(_, 5)(25), 5);
  });
});
