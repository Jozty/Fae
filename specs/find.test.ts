import { describe, it } from './_describe.ts';
import { _, find, pipe, transduce } from '../mod.ts';
import { eq } from './utils/utils.ts';
import type { Func } from '../utils/types.ts';

describe('find', () => {
  const obj1 = { x: 100 };
  const obj2 = { x: 200 };
  const a = [
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

  it('should return the first element that satisfies the predicate', () => {
    eq(find(even, a), 10);
    eq(find(gt100, a), 200);
    eq(find(isStr, a), 'cow');
    eq(find(xGt100, a), obj2);
  });

  it('transduces the first element that satisfies the predicate into an array', () => {
    eq(intoArray(find(even, a)), [10]);
    eq(intoArray(find(gt100, a)), [200]);
    eq(intoArray(find(isStr, a)), ['cow']);
    eq(intoArray(find(xGt100, a)), [obj2]);
  });

  it('should return `undefined` when no element satisfies the predicate', () => {
    eq(find(even, ['zing']), undefined);
  });

  it('should return `undefined` in array when no element satisfies the predicate into an array', () => {
    eq(intoArray(find(even, ['zing'])), [undefined]);
  });

  it('should return `undefined` when given an empty list', () => {
    eq(find(even, []), undefined);
  });

  it('should return `undefined` into an array when given an empty list', () => {
    eq(intoArray(find(even, [])), [undefined]);
  });

  it('should act as transducer', () => {
    const t1 = pipe(find(even)) as Func<[El[]], El>;
    eq(t1(a), 10);

    eq(
      transduce(t1, (_a: El | undefined, b: El | undefined) => b, undefined, a),
      10,
    );
  });

  it('should return the curried versions too', () => {
    eq(find(_, a)(even), 10);
    eq(find(gt100)(a), 200);
    eq(find(isStr)(a), 'cow');
  });
});
