import { describe, it } from './_describe.ts';
import { _, any, flip, inc, map, pipe, transduce } from '../mod.ts';
import { eq } from './utils/utils.ts';
import { Func } from '../utils/types.ts';

describe('any', () => {
  const odd = (a: number) => (a & 1) === 1;
  const T = () => true;
  // const intoArray = R.into([])

  it('should return true if any element satisfies the predicate', () => {
    eq(any(odd, [2, 4, 6, 8, 10, 11, 12]), true);
  });

  it('should return false if all elements fails to satisfy the predicate', () => {
    eq(any(odd, [2, 4, 6, 8, 10, 12]), false);
  });

  // it('should return true into array if any element satisfies the predicate', () => {
  //   eq(intoArray(any(odd), [2, 4, 6, 8, 10, 11, 12]), [true])
  // })

  // it('returns false if all elements fails to satisfy the predicate', () => {
  //   eq(intoArray(any(odd), [2, 4, 6, 8, 10, 12]), [false])
  // })

  it('should work with more complex objects', () => {
    const people = [
      { first: 'Paul', last: 'Grenier' },
      { first: 'Mike', last: 'Hurley' },
      { first: 'Will', last: 'Klein' },
    ];
    const anyiterative = (person: typeof people[number]) =>
      person.first.charAt(0) === person.last.charAt(0);

    eq(any(anyiterative, people), false);
    people.push({ first: 'Scott', last: 'Sauyet' });
    eq(any(anyiterative, people), true);
  });

  it('can use a configurable function', () => {
    const teens = [
      { name: 'Alice', age: 14 },
      { name: 'Betty', age: 18 },
      { name: 'Cindy', age: 17 },
    ];
    const atLeast = (age: number) =>
      (person: typeof teens[number]) => person.age >= age;

    eq(any(atLeast(16), teens), true);
    eq(any(atLeast(21), teens), false);
  });

  it('should return false for an empty list', () => {
    eq(any(T, []), false);
  });

  // it('returns false into array for an empty list', () => {
  //   eq(intoArray(any(T), []), [false])
  // })

  it('should work with transformers too', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const less2 = (a: number) => a < 2;
    const t1 = pipe(map(inc), any(less2)) as Func<[number[]], boolean>;

    eq(t1(arr), false);
    eq(
      transduce(
        t1,
        flip((a: number, _b: number) => a),
        11,
        arr,
      ),
      2,
    );
  });

  it('should work on curried versions too', () => {
    const a = (a: number) => a % 3 === 0;
    const b = [1, 2, 3, 4, 5, 6, 7, 8];
    const expected = true;

    eq(any(a, b), expected);
    eq(any(a)(b), expected);
    eq(any(_, b)(a), expected);
  });
});
