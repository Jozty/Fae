import { describe, it } from './_describe.ts';
import { _, all, compose, flip, inc, map, pipe, transduce } from '../mod.ts';
import { eq, thr } from './utils/utils.ts';

describe('all', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const arrL = {
    0: 1,
    4: 2,
    6: 7,
    length: 10,
  };
  const mod3 = (a: number) => a % 3 === 1;
  const greater0 = (a: number) => a > 0;
  it('should work with arrays and array-likes', () => {
    eq(all(mod3, arr), false);
    eq(all(greater0, arr), true);

    eq(all(mod3, arrL), false);
    eq(all(greater0, arrL), false);
  });

  it('should work with transformers too', () => {
    const t1 = pipe(map(inc), all(greater0));

    eq(t1(arr), true);
    eq(
      transduce(
        t1,
        flip((a, _) => a),
        11,
        arr,
      ),
      2,
    );

    const t2 = compose(map(inc), all(mod3));

    thr(
      () => t2([1, 2, 3, 4, 5]),
      'Functor can be only array, object or a transformer',
    );
    eq(
      transduce(
        t2,
        flip((a, _) => a),
        11,
        arr,
      ),
      false,
    );
  });

  it('should work on curried versions too', () => {
    const a = (a: number) => a % 3 === 0;
    const b = [1, 2, 3, 4, 5, 6, 7, 8];
    const expected = false;

    eq(all(a, b), expected);
    eq(all(a)(b), expected);
    eq(all(_, b)(a), expected);
  });
});
