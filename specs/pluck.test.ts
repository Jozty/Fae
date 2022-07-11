import { describe, it } from './_describe.ts';
import { _, pluck } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('pluck', () => {
  const peoples = [
    { name: 'Shubham', age: 23, marks: [1, 2, 3, 4, 5] },
    { name: 'Shivam', age: 21, marks: [11, 21, 31, 41, 51] },
    { name: 'krish', age: 20, marks: [12, 22, 32, 42, 52] },
  ];

  it('should return a function that maps the appropriate property over an array', () => {
    eq(typeof pluck('name'), 'function');
    eq(pluck('name')(peoples), ['Shubham', 'Shivam', 'krish']);
    eq(pluck('age', peoples), [23, 21, 20]);
  });

  it('should work with curried versions too', () => {
    eq(pluck('age')(peoples), [23, 21, 20]);
    eq(pluck(_, peoples)('marks'), [
      [1, 2, 3, 4, 5],
      [11, 21, 31, 41, 51],
      [12, 22, 32, 42, 52],
    ]);
    eq(pluck('marks')(peoples), [
      [1, 2, 3, 4, 5],
      [11, 21, 31, 41, 51],
      [12, 22, 32, 42, 52],
    ]);
  });
});
