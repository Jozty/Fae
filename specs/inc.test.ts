import { describe, it } from './_describe.ts';
import { _, inc } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('inc', () => {
  it('should increment its argument', () => {
    eq(inc(-1), 0);
    eq(inc(0), 1);
    eq(inc(1), 2);
    eq(inc(1020.34), 1021.34);
    eq(inc(-Infinity), -Infinity);
    eq(inc(Infinity), Infinity);
    eq(inc(NaN), NaN);
  });
});
