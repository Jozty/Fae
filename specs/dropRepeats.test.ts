import { describe, it } from './_describe.ts';
import { append, dropRepeats, equals, flip, pipe, transduce } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('dropRepeats', () => {
  const obj = [1, 2, 3, 4, 5, 3, 2];
  const obj2 = [1, 2, 2, 2, 3, 4, 4, 5, 5, 3, 2, 2];

  it('should remove repeated elements', () => {
    eq(dropRepeats(obj2), obj);
    eq(dropRepeats(obj), obj);
  });

  it('should return an empty array for an empty array', () => {
    eq(dropRepeats([]), []);
  });

  it('can act as a transducer', () => {
    const t1 = pipe(dropRepeats);
    eq(transduce(t1, flip(append), [], obj2), obj);
  });

  it('has Fae.equals semantics', () => {
    class Just {
      private value: any;
      constructor(x: any) {
        this.value = x;
      }

      equals(x: any) {
        return x instanceof Just && equals(x.value, this.value);
      }
    }

    eq(dropRepeats([0, -0]).length, 2);
    eq(dropRepeats([-0, 0]).length, 2);
    eq(dropRepeats([NaN, NaN]).length, 1);
    eq(dropRepeats([new Just([42]), new Just([42])]).length, 1);
  });
});
