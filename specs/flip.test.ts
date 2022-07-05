import { describe, it } from './_describe.ts';
import { _, concat, flip } from '../mod.ts';
import { eq } from './utils/utils.ts';
import { getFunctionLength } from '../utils/get.ts';
import { Curry2, Curry3 } from '../utils/types.ts';

describe('flip', () => {
  const f = (a: string, b: string, c: number) => a + ' ' + b + ' ' + c;
  const i = (a: number, b: number, c: number) => a + b * c;
  it('should return a function which inverts the first two arguments to the supplied function', () => {
    const g = flip(f) as Curry3<string, string, number, string>;
    eq(f('a', 'b', 3), 'a b 3');
    eq(g('a', 'b', -3), 'b a -3');
    eq(g('a', '@', Infinity), '@ a Infinity');
  });

  it('should return a function which inverts the first two arguments to the supplied function', () => {
    const h = flip(i) as Curry3<number>;
    eq(i(2, 3, 4), 14);
    eq(h(2, 3, 4), 11);
    eq(i(2, -3, 4), -10);
    eq(h(2, -3, 4), 5);
  });

  it('should return a curried function', () => {
    const g = flip(f)('a') as Curry2<string, number, string>;
    eq(g('b', 3), 'b a 3');
    eq(g(_, 3)('b'), 'b a 3');
    eq(g('b')(3), 'b a 3');

    const h = flip(i)(2) as Curry2<number>;
    eq(h(-4, 5), 6);
    eq(h(-4)(3), 2);
    eq(h(_, 3)(-4), 2);
  });

  it('should enforce using type assertion non the retured function', () => {
    const mergeThree = (a: number, b: number, c: number) => [a].concat(b, c);

    eq(mergeThree(1, 2, 3), [1, 2, 3]);

    const flipped = flip(mergeThree);

    // @ts-expect-error: append should have been type-asserted
    eq(flipped(1, 2)(3), [2, 1, 3]);

    const flippedWithTypes = flipped as Curry3<
      number,
      number,
      number,
      number[]
    >;

    eq(flippedWithTypes(1, 2)(3), [2, 1, 3]);
  });

  it('should return a function with the correct arity', () => {
    const f2 = (a: string, b: string) => a + ' ' + b;
    const f3 = (a: string, b: string, c: string) => a + ' ' + b + ' ' + c;
    eq(getFunctionLength(flip(f2)), 2);
    eq(getFunctionLength(flip(f3)), 3);
  });
});
