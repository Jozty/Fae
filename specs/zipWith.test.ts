import { describe, it } from './_describe.ts';
import { _, add, multiply, zipWith } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('zipWith', () => {
  const a = [1, 2, 3];
  const b = [100, 200, 300];
  const c = [10, 20, 30, 40, 50, 60];
  const s = (a: number, b: number) => a + ' cow ' + b;
  const y = ['Cow', 'Horse', 'Dog'];
  const f = zipWith((a: number, b: String) => a + ' ' + b);

  it('should return an array created by applying its passed-in function pair-wise on its passed in arrays', () => {
    const z = zipWith(_, a, b);

    eq(z(add as (a: number, b: number) => number), [101, 202, 303]);
    eq(z(multiply as (a: number, b: number) => number), [
      100,
      400,
      900,
    ]);
    eq(z(s), ['1 cow 100', '2 cow 200', '3 cow 300']);
    eq(f(a)(y), ['1 Cow', '2 Horse', '3 Dog']);
  });

  it('should return an array whose length is equal to the shorter of its input arrays', () => {
    eq(
      zipWith(add as (a: number, b: number) => number, a, c).length,
      a.length,
    );
    eq(f(c)(y), ['10 Cow', '20 Horse', '30 Dog']);
  });

  it('should test curried versions too', () => {
    const a = [1, 2, 3];
    const b = [100, 200];

    eq(zipWith(s)(a)(b), ['1 cow 100', '2 cow 200']);
    eq(zipWith(s, _, b)(a), ['1 cow 100', '2 cow 200']);
    eq(zipWith(_, a, [])(s), []);
    eq(zipWith(s, a)(b), ['1 cow 100', '2 cow 200']);
    eq(zipWith(s)([5, 10])(b), ['5 cow 100', '10 cow 200']);
    eq(zipWith(_, _, b)(s)(a), ['1 cow 100', '2 cow 200']);
    eq(zipWith(_, b)(s)(a), ['100 cow 1', '200 cow 2']);
  });
});
