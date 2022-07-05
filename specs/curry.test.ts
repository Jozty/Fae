import { describe, it } from './_describe.ts';
import { _, curry } from '../mod.ts';
import { eq } from './utils/utils.ts';
import { getFunctionLength } from '../utils/get.ts';

describe('curry', () => {
  const f = (a: number, b: number, c: number, d: number) => {
    void d;
    return a * b * c;
  };
  it('should accept an arity', () => {
    const curried = curry(3, f);
    eq(curried(1)(2)(3), 6);
    eq(curried(1, 2)(3), 6);
    eq(curried(1)(2, 3), 6);
    eq(curried(1, 2, 3), 6);
  });

  it('should be able to be partially applied', () => {
    const curry3 = curry(3);
    const curried = curry3(f);
    eq(getFunctionLength(curried), 3);
    eq(curried(1)(2)(3), 6);
    eq(curried(1, 2)(3), 6);
    eq(curried(1)(2, 3), 6);
    eq(curried(1, 2, 3), 6);
  });

  it('should preserve the context', () => {
    const ctx = { x: 10 };
    const f = function (this: any, a: number, b: number) {
      return a + b * this.x;
    };
    const g = curry(2, f);

    eq(g.call(ctx, 2, 4), 42);
    eq(g.call(ctx, 2).call(ctx, 4), 42);
  });

  it('should support the placeholder', () => {
    const f = function () {
      return Array.prototype.slice.call(arguments);
    };
    const g = curry(3, f);

    eq(g(1)(2)(3), [1, 2, 3]);
    eq(g(1)(2, 3), [1, 2, 3]);
    eq(g(1, 2)(3), [1, 2, 3]);
    eq(g(1, 2, 3), [1, 2, 3]);

    eq(g(_, 2, 3)(1), [1, 2, 3]);
    eq(g(1, _, 3)(2), [1, 2, 3]);
    eq(g(1, 2, _)(3), [1, 2, 3]);

    eq(g(1, _, _)(2)(3), [1, 2, 3]);
    eq(g(_, 2, _)(1)(3), [1, 2, 3]);
    eq(g(_, _, 3)(1)(2), [1, 2, 3]);

    eq(g(1, _, _)(2, 3), [1, 2, 3]);
    eq(g(_, 2, _)(1, 3), [1, 2, 3]);
    eq(g(_, _, 3)(1, 2), [1, 2, 3]);

    eq(g(1, _, _)(_, 3)(2), [1, 2, 3]);
    eq(g(_, 2, _)(_, 3)(1), [1, 2, 3]);
    eq(g(_, _, 3)(_, 2)(1), [1, 2, 3]);

    eq(g(_, _, _)(_, _)(_)(1, 2, 3), [1, 2, 3]);
    eq(g(_, _, _)(1, _, _)(_, _)(2, _)(_)(3), [1, 2, 3]);
  });

  it('should not forward extra arguments', function () {
    const f = function () {
      return Array.prototype.slice.call(arguments);
    };
    const g = curry(3, f);

    eq(g(1, 2, 3), [1, 2, 3]);
    eq(g(1, 2, 3, 4, 5), [1, 2, 3]);
    eq(g(1, 2)(3, 4), [1, 2, 3]);
    eq(g(1)(2, 3, 4), [1, 2, 3]);
    eq(g(1)(2)(3, 4), [1, 2, 3]);
  });
});
