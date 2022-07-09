import { describe, it } from './_describe.ts';
import { _, equals, indexOf } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('indexOf', () => {
  it('should return a number indicating an object\'s position in a list', () => {
    const list = [0, 10, 20, 30];
    eq(indexOf(30, list), 3);
    eq(indexOf(40, list), -1);
    eq(indexOf(0, list), 0);
  });

  const input = [1, 2, 1, 2, 5];

  it('should return the index of the first item when there are duplicates of such item', () => {
    eq(indexOf(1, input), 0);
    eq(indexOf(2, input), 1);
  });

  it('should return the index of the last item in the array', () => {
    eq(indexOf(5, input), 4);
  });

  const list = [1, 2, 3];
  list[-2] = 4; // Throw a wrench in the gears by assigning a non-valid array index as object property.

  it('should find 1', () => {
    eq(indexOf(1, list), 0);
    eq(indexOf(2, list), 1);
  });

  it('should find 1 and is result strictly it', () => {
    eq(indexOf(1, list), 0);
  });

  it('should not find 4', () => {
    eq(indexOf(4, list), -1);
  });

  it('should not consider "1" equal to 1', () => {
    eq(indexOf('1', list as (string | number)[]), -1);
  });

  it('should return -1 for an empty array', () => {
    eq(indexOf('x', []), -1);
  });

  it('should have equals semantics', () => {
    class Just {
      private value: any;
      constructor(x: any) {
        this.value = x;
      }
      equals(x: any) {
        return x instanceof Just && equals(x.value, this.value);
      }
    }

    eq(indexOf(0, [-0]), -1);
    eq(indexOf(-0, [0]), -1);
    eq(indexOf(NaN, [NaN]), 0);
    eq(indexOf(new Just([42]), [new Just([42])]), 0);
  });

  it('should find function, compared by identity', () => {
    const f = () => {};
    const g = () => {};
    const list = [g, f, g, f];
    eq(indexOf(f, list), 1);
  });

  it('should not find function, compared by identity', () => {
    const f = () => {};
    const g = () => {};
    const h = () => {};
    const list = [g, f];
    eq(indexOf(h, list), -1);
  });

  it('should test curried versions too', () => {
    eq(indexOf(_, [-0])(0), -1);
    eq(indexOf(2)(list), 1);
    eq(indexOf(5)(input), 4);
    eq(indexOf(_, input)(2), 1);
  });
});
