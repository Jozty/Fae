import { describe, it } from './_describe.ts';
import { _, findLastIndex, pipe, transduce } from '../mod.ts';
import { eq } from './utils/utils.ts';
import type { Func } from '../utils/types.ts';

describe('findLastIndex', () => {
  var obj1 = { x: 100 };
  var obj2 = { x: 200 };
  var a = [
    11,
    10,
    9,
    'cow',
    obj1,
    8,
    7,
    100,
    200,
    300,
    obj2,
    4,
    3,
    2,
    1,
    0,
  ];

  type El = typeof a[number];

  const even = (x: El) => typeof x === 'number' && x % 2 === 0;
  const gt100 = (x: El) => typeof x === 'number' && x > 100;
  const isStr = (x: El) => typeof x === 'string';
  const xGt100 = (o: El) => typeof o === 'object' && o.x > 100;
  const intoArray = (a?: El) => [a];

  it('should return the index of the last element that satisfies the predicate', () => {
    eq(findLastIndex(even, a), 15);
    eq(findLastIndex(gt100, a), 9);
    eq(findLastIndex(isStr, a), 3);
    eq(findLastIndex(xGt100, a), 10);
  });

  it('should return -1 when no element satisfies the predicate', () => {
    eq(findLastIndex(even, ['zing']), -1);
  });

  it('returns the index of the last element into an array that satisfies the predicate', () => {
    eq(intoArray(findLastIndex(even, a)), [15]);
    eq(intoArray(findLastIndex(gt100, a)), [9]);
    eq(intoArray(findLastIndex(isStr, a)), [3]);
    eq(intoArray(findLastIndex(xGt100, a)), [10]);
  });

  it('returns -1 into an array when no element satisfies the predicate', () => {
    eq(intoArray(findLastIndex(even, ['zing'])), [-1]);
  });

  it('should works when the first element matches', () => {
    eq(findLastIndex(even, [2, 3, 5]), 0);
  });

  it('should not go into an infinite loop on an empty array', () => {
    eq(findLastIndex(even, []), -1);
  });

  it('should return the curried versions too', () => {
    eq(findLastIndex(even)(a), 15);
    eq(findLastIndex(_, a)(gt100), 9);
    eq(findLastIndex(isStr)(a), 3);
  });

  it('should act as transducer', () => {
    const t1 = pipe(findLastIndex(even)) as Func<[El[]], El>;
    eq(t1(a), 15);

    const endTransformer = (_a: El | undefined, b: El | undefined) => b;

    eq(
      transduce(t1, endTransformer, undefined, a),
      15,
    );

    const t2 = pipe(findLastIndex((x: number) => x > 1000)) as Func<[El[]], El>;

    eq(t2(a), -1);
    eq(
      transduce(t2, endTransformer, undefined, a),
      -1,
    );
  });
});
