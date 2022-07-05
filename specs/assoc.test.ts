import { describe, it } from './_describe.ts';
import { _, assoc } from '../mod.ts';
import { eq, strictEq } from './utils/utils.ts';

describe('assoc', () => {
  it('should make a shallow clone of an object, overriding only the specified property', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5 };
    const obj2 = assoc('e', { x: 42 }, obj1);
    eq(obj2, { a: 1, b: { c: 2, d: 3 }, e: { x: 42 }, f: 5 });
    // Note: reference equality below!
    strictEq(obj2.a, obj1.a);
    strictEq(obj2.b, obj1.b);
    strictEq(obj2.f, obj1.f);
  });

  it('is the equivalent of clone and set if the property is not on the original', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5 };
    const obj2 = assoc('z', { x: 42 }, obj1);
    eq(obj2, { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5, z: { x: 42 } });
    // Note: reference equality below!
    strictEq(obj2.a, obj1.a);
    strictEq(obj2.b, obj1.b);
    strictEq(obj2.f, obj1.f);
  });

  it('should work with curried calls too', () => {
    const functor = { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5 };
    const val = { x: 42 };
    const expected = {
      a: 1,
      b: { c: 2, d: 3 },
      e: 4,
      f: 5,
      z: { x: 42 },
    };

    const a_2_3 = assoc('z');

    eq(a_2_3(val)(functor), expected);
    eq(a_2_3(val, functor), expected);
    eq(a_2_3(_, functor)(val), expected);

    const a_1_3 = assoc(_, val);

    eq(a_1_3('z')(functor), expected);
    eq(a_1_3('z', functor), expected);
    eq(a_1_3(_, functor)('z'), expected);

    const a_1_2 = assoc(_, _, functor);

    eq(a_1_2('z')(val), expected);
    eq(a_1_2('z', val), expected);
    eq(a_1_2(_, val)('z'), expected);

    const a_3 = assoc('z', val);
    eq(a_3(functor), expected);

    const a_2 = assoc('z', _, functor);
    eq(a_2(val), expected);

    const a_1 = assoc(_, val, functor);
    eq(a_1('z'), expected);
  });
});
