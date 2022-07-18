import { describe, it } from './_describe.ts';
import { _, min } from '../mod.ts';
import { eq } from './utils/utils.ts';
//TODO singla-shivam (Returns the second argument if one of the arguments is NaN and check for curried tests)

describe('min', () => {
  it('should returns the smaller of its two arguments', () => {
    eq(min(10, 8), 8);
    eq(min(-10, 8), -10);
    eq(min(10, -8), -8);
    eq(min(-10.888, -8.635), -10.888);
    eq(min(-10000000, 8555533), -10000000);
    eq(min(-10.4, 8.4), -10.4);
    eq(min(-10, 0.8263), -10);
    eq(min(Infinity, 0), 0);
    eq(min(0, Infinity), 0);
    eq(min(NaN, 1000), 1000);
    eq(min(NaN, 0), 0);
    eq(min(0, NaN), NaN);
    eq(min(Infinity, NaN), NaN);
    eq(min(NaN, Infinity), Infinity);
  });

  it('should work for any String type', () => {
    eq(min('20', '21'), '20');
    eq(min('a', 'z'), 'a');
    eq(min('z', 'a'), 'a');
    eq(min('', 'a'), '');
    eq(min('a', ''), '');
    eq(min('me', 'mi'), 'me');
    eq(min('hi', 'm'), 'hi');
    eq(min('az', 'za'), 'az');
  });

  it('should work for any orderable type', () => {
    const d1: Date = new Date('01-01-2001');
    const d2: Date = new Date('01-01-2002');

    eq(min(d1)(d2), d1);
    // @ts-expect-error: because min(a, b) === min(b, a)
    eq(min(_, d1)(d2), d1);
  });

  it('should test curried versions too', () => {
    eq(min(25)(50), 25);
    // @ts-expect-error: because min(a, b) === min(b, a)
    eq(min(_, 25)(20), 20);
    eq(min(25)(30), 25);
    // @ts-expect-error: because min(a, b) === min(b, a)
    eq(min(_, 'ab')('aaa'), 'aaa');
    eq(min('aa')('aab'), 'aa');
  });
});
