import { describe, it } from './_describe.ts';
import { not } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('not', () => {
  it('should be properly declared', () => {
    eq(not(true), false);
    eq(not(''), true);
    eq(not('asas'), false);
    eq(not(1), false);
    eq(not(0), true);
    eq(not(-1), false);
    eq(not(undefined), true);
    eq(not(not(undefined)), false);
    eq(not({}), false);
    eq(not({ x: {} }), false);
    eq(not(null), true);
    eq(not([]), false);
    eq(not([[]]), false);
    eq(not(![]), true);
    eq(not(NaN), true);
  });
});
