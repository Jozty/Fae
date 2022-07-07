import { describe, it } from './_describe.ts';
import { _, findIndex } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('findIndex', () => {
  let obj1 = { x: 10 };
  let a = [2, 4, obj1, 3, 12, 25, obj1, 'Foo', undefined, 21];
  let b = [2, 4, 3, 12, 25, 21];

  // TODO: (ch-shubham) Add Testing Support for Predicates

  // let even = (x: number) => x % 2 === 0
  // let odd = (x: number) => x % 2 === 1
  // let gt5 = (x: any) => x > 5
  // let isStr = (x: any) => { return typeof x === 'string'}
  // let isObj = (x: any) => { return typeof x === 'object'}

  it('should return the index of the first element that satisfies the element equality', function () {
    eq(findIndex(a, 2), 0);
    // @ts-ignore
    eq(findIndex(a, undefined), 8);
    eq(findIndex(a, 'Foo'), 7);
    eq(findIndex(a, obj1), 2);
  });

  it('should return -1 when no element satisfies the predicate', function () {
    eq(findIndex(['Bar'] as (string | number)[], 15), -1);
    eq(findIndex(a, 125), -1);
  });

  it('should return the curried versions too', function () {
    eq(findIndex(a)(obj1), 2);
    eq(findIndex(_, 3)(b), 2);
    eq(findIndex(a)(obj1), 2);
  });
});
