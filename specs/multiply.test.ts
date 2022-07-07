import { describe, it } from './_describe.ts';
import { _, multiply } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('multiply', () => {
  it('should multiply two numbers', () => {
    eq(multiply(25, 5), 125);
    eq(multiply(25, 4), 100);
    eq(multiply(NaN, 10), NaN);
    eq(multiply(Infinity, 4), Infinity);
    eq(multiply(25, Infinity), Infinity);
    eq(multiply(Infinity, Infinity), Infinity);
    eq(multiply(0, 0), 0);
    eq(multiply(25, 0), 0);
  });

  it('should test curried versions too', () => {
    eq(multiply(25)(5), 125);
    // @ts-expect-error: multiply(a, b) === multiply(b, a)
    eq(multiply(_, 4)(25), 100);
  });
});
