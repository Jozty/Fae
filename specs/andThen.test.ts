import { describe, it } from './_describe.ts';
import { andThen, compose, inc, pipe } from '../mod.ts';
import { eq, thr } from './utils/utils.ts';

describe('andThen', () => {
  it('throws a typeError if the then method does not exist', () => {
    thr(
      // @ts-expect-error: 1 is not a promise-like
      () => andThen(inc, 1),
      '`andThen` expected a Promise, received 1',
    );
  });

  it('should invoke then on the promise with the function passed to it', async () => {
    const p = new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    });
    await andThen(function (n) {
      eq(n, 1);
    }, p);
  });

  it('should flatten promise returning functions', async () => {
    const incAndWrap = compose(Promise.resolve.bind(Promise), inc);
    const asyncAddThree = pipe(
      incAndWrap,
      andThen(incAndWrap),
      andThen(incAndWrap),
    );

    await andThen((result) => {
      eq(result, 4);
    })(asyncAddThree(1));
  });

  it('should not dependent on a particular promise implementation', async () => {
    const thennable = {
      then: function (f: Function) {
        return f(42);
      },
    };

    const f = function (n: number) {
      eq(n, 42);
    };

    // TODO
    // @ts-ignore
    await andThen(f, thennable);
  });
});
