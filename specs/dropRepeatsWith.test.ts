import { describe, it } from './_describe.ts';
import { _, append, dropRepeatsWith, flip, pipe, transduce } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('dropRepeatsWith', () => {
  const obj = [
    { i: 1 },
    { i: 2 },
    { i: 3 },
    { i: 4 },
    { i: 5 },
    { i: 3 },
  ];
  const obj2 = [
    { i: 1 },
    { i: 1 },
    { i: 1 },
    { i: 2 },
    { i: 3 },
    { i: 3 },
    { i: 4 },
    { i: 4 },
    { i: 5 },
    { i: 3 },
  ];
  const eqI = (a: { i: number }, b: { i: number }) => a.i === b.i;

  it('should remove repeated elements based on predicate', () => {
    eq(dropRepeatsWith(eqI, obj2), obj);
    eq(dropRepeatsWith(eqI, obj), obj);
  });

  it('should keep elements from the left', () => {
    eq(
      dropRepeatsWith(eqI, [
        { i: 1, n: 1 },
        { i: 1, n: 2 },
        { i: 1, n: 3 },
        { i: 4, n: 1 },
        { i: 4, n: 2 },
      ]),
      [
        { i: 1, n: 1 },
        { i: 4, n: 1 },
      ],
    );
  });

  it('should return an empty array for an empty array', () => {
    eq(dropRepeatsWith(eqI, []), []);
  });

  it('should act as a transducer', () => {
    const t1 = pipe(dropRepeatsWith(eqI));
    eq(transduce(t1, flip(append), [], obj2), obj);
  });

  it('should work with curried versions too', () => {
    const func = (a: number, b: number) => b - 1 === a;
    const list = [1, 2, 3, 4, 6, 7, 8];

    eq(dropRepeatsWith(func, list), [1, 6]);
    eq(dropRepeatsWith(func)(list), [1, 6]);
    eq(dropRepeatsWith(_, list)(func), [1, 6]);
  });
});
