import { describe, it } from './_describe.ts';
import { _, curry } from '../mod.ts';
import { eq } from './utils/utils.ts';
import { getFunctionLength } from '../utils/get.ts';
import type { Curry2, Curry3 } from '../utils/types.ts';

describe('curry', () => {
  const f = (a: number, b: number, c: number, d: number) => {
    void d;
    return a * b * c;
  };
  it('should accept an arity', () => {
    const curried = curry(3, f) as Curry3<number>;
    eq(curried(1)(2)(3), 6);
    eq(curried(1, 2)(3), 6);
    eq(curried(1)(2, 3), 6);
    eq(curried(1, 2, 3), 6);
  });

  it('should be able to be partially applied', () => {
    // @ts-ignore: will be called with both arguments in most of the cases
    const curry3 = curry(3);
    const curried = curry3(f) as Curry3<number>;
    eq(getFunctionLength(curried), 3);
    eq(curried(1)(2)(3), 6);
    eq(curried(1, 2)(3), 6);
    eq(curried(1)(2, 3), 6);
    eq(curried(1, 2, 3), 6);
  });

  it('should preserve the context', () => {
    const ctx = { x: 10 };

    const f = function (this: typeof ctx, a: number, b: number) {
      return a + b * this.x;
    };

    const g = curry(2, f) as Curry2<number>;

    eq(g.call(ctx, 2, 4), 42);
    // @ts-ignore: overloads not inferred properly in call
    eq(g.call(ctx, 2).call(ctx, 4), 42);
  });

  it('should support the placeholder', () => {
    const f = function (...args: number[]) {
      return args;
    };

    const g = curry(3, f) as Curry3<number, number, number, number[]>;

    eq(g(1)(2)(3), [1, 2, 3]);
    eq(g(1)(2, 3), [1, 2, 3]);
    eq(g(1, 2)(3), [1, 2, 3]);
    eq(g(1, 2, 3), [1, 2, 3]);

    eq(g(_, 2, 3)(1), [1, 2, 3]);
    eq(g(1, _, 3)(2), [1, 2, 3]);
    eq(g(1, 2)(3), [1, 2, 3]);

    eq(g(_, 2)(1)(3), [1, 2, 3]);
    eq(g(_, _, 3)(1)(2), [1, 2, 3]);

    eq(g(_, 2)(1, 3), [1, 2, 3]);
    eq(g(_, _, 3)(1, 2), [1, 2, 3]);

    eq(g(1)(_, 3)(2), [1, 2, 3]);
    eq(g(_, 2)(_, 3)(1), [1, 2, 3]);
    eq(g(_, _, 3)(_, 2)(1), [1, 2, 3]);
  });

  it('should not forward extra arguments', function () {
    const f = function (...args: number[]) {
      return args;
    };

    const g = curry(3, f) as Curry3<number, number, number, number[]>;

    eq(g(1, 2, 3), [1, 2, 3]);

    // @ts-expect-error: extra arguments
    eq(g(1, 2, 3, 4, 5), [1, 2, 3]);

    // @ts-expect-error: extra arguments
    eq(g(1, 2)(3, 4), [1, 2, 3]);

    // @ts-expect-error: extra arguments
    eq(g(1)(2, 3, 4), [1, 2, 3]);

    // @ts-expect-error: extra arguments
    eq(g(1)(2)(3, 4), [1, 2, 3]);
  });
});
