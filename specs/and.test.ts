import { describe, it } from './_describe.ts';
import { _, and } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('and', () => {
  it('should compare two values properly', () => {
    eq(and(true, true), true);
    eq(and(true, false), false);
    eq(and(false, true), false);
    eq(and(false, false), false);
    eq(and(and(true, true), true), true);
    eq(and(and(true, false), true), false);
    eq(and(and(false, true), true), false);
    eq(and(and(false, false), true), false);
    eq(and(undefined, true), false);
    eq(and(undefined, false), false);
    // fae-no-check
    eq(and(undefined, undefined as any), false);
    // fae-no-check
    eq(and(true, undefined as any), false);
    eq(and(2, 1), true);
    eq(and(0, true), false);
    eq(and('', true), false);
    eq(and(null, true), false);
    eq(and(NaN, true), false);
    eq(and('a', true), true);
    eq(and([], true), true);
    eq(and({}, true), true);
    eq(and({}, undefined as any), false);
    eq(and([1, 2], NaN), false);
    eq(and({ 1: 2 }, true), true);
    eq(and([1, 2, 3], true), true);
    //prettier-ignore
    eq(and(function () {}, true), true);
    eq(and([], {}), true);
    //prettier-ignore
    eq(and(function () {}, ''), false);
    //prettier-ignore
    eq(and('', ''), false);
  });

  it('should work on curried versions too', () => {
    eq(and('')(0n), false);
    eq(and(undefined)(undefined), false);
    eq(and(112)(undefined), false);
    eq(and(undefined)(112), false);
    eq(and('sfd')(112), true);
    eq(and('sfd')([]), true);
  });
});
