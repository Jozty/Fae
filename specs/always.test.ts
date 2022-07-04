import { describe, it } from './_describe.ts';
import { always } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('always', () => {
  it('should return a function that returns the object initially supplied', () => {
    const f = always(42);
    eq(f(), 42);
    // @ts-ignore
    eq(f(10), 42);
    // @ts-ignore
    eq(f(false), 42);

    const f2 = always({ a: 12 });
    eq(f2(), { a: 12 });
    // @ts-ignore
    eq(f2(10), { a: 12 });
    // @ts-ignore
    eq(f2(false), { a: 12 });
  });

  it('should work with various types', () => {
    eq(always(false)(), false);
    eq(always('abc')(), 'abc');
    eq(always({ a: 1, b: 2 })(), { a: 1, b: 2 });
    const obj = { a: 1, b: 2 };
    eq(always(obj)(), obj);
    const now = new Date(1776, 6, 4);
    eq(always(now)(), new Date(1776, 6, 4));
    //@ts-ignore
    eq(always(undefined)(), undefined);
  });
});
