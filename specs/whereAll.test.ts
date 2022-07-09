import { describe, it } from './_describe.ts';
import { _, curry, whereAll } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('whereAll', () => {
  const equals = curry(2, (x: number, y: number) => x === y);
  const specP = {
    name: { firstName: equals('Bob'), lastname: equals('Hanks') },
    address: { city: equals('LA'), state: equals('California') },
  };

  const person1 = {
    name: { firstName: 'Bob', lastname: 'South' },
    address: { city: 'LA', state: 'California' },
  };

  const person2 = {
    name: { firstName: 'Tom', lastname: 'Hanks' },
    address: { city: 'New York City', state: 'New York' },
  };

  it('should be properly declared.', function () {
    const spec = { x: equals('foo'), y: equals(7) };
    const spec2 = { x: equals(undefined) };
    const test1 = { x: 12, y: 200 };
    const test2 = { x: 'foo', y: 7 };
    const test4 = { x: null };
    const test5 = { x: undefined };
    const test6 = { x: 1 };

    eq(whereAll(spec, test1), false);
    eq(whereAll(spec, test2), true);
    eq(whereAll(spec2, test4), false);
    eq(whereAll(spec2, test5), true);
    eq(whereAll(spec2, test6), false);
    eq(whereAll({}, { x: 1 }), false);
    eq(whereAll(specP.address, person1.address), true);
    eq(whereAll(specP.address, person2.address), false);
  });

  it('should return true if the test object satisfies the spec', () => {
    const spec = { x: equals(0), y: equals(2) };
    const test1 = { x: 0, y: 200 };
    const test2 = { x: 0, y: 10 };
    const test3 = { x: 0, y: 2 };
    const test4 = { x: 1, y: 2 };

    eq(whereAll(spec, test1), false);
    eq(whereAll(spec, test2), false);
    eq(whereAll(spec, test3), true);
    eq(whereAll(spec, test4), false);
  });

  it('should not need the spec and the test object to have the same interface (the test object will have a superset of the specs properties)', function () {
    const spec = { x: equals(20) };
    const spec2 = { x: equals(20), z: equals('foo') };
    const test1 = { x: 125, y: 100, z: 100 };
    const test2 = { p: 1, x: 20, y: 100, z: 100 };
    const test3 = { x: 20, y: 'foo' };
    const test4 = { x: 125 };

    eq(whereAll(spec, test1), false);
    eq(whereAll(spec, test2), true);
    eq(whereAll(spec2, test3), false);
    eq(whereAll(spec2, test4), false);
  });

  it('should match specs that have undefined properties', () => {
    const spec = { x: equals(undefined) };
    const test1 = {};
    const test2 = { x: null };
    const test3 = { x: undefined };
    const test4 = { x: 1 };

    eq(whereAll(spec, test1), true);
    eq(whereAll(spec, test2), false);
    eq(whereAll(spec, test3), true);
    eq(whereAll(spec, test4), false);
  });

  it('should return false for an empty spec', () => {
    eq(whereAll({}, { a: 1 }), false);
  });

  it('should match inherited properties', () => {
    const spec = {
      toString: equals(Object.prototype.toString),
      valueOf: equals(null),
    };

    eq(whereAll(spec, {}), false);
  });

  it('should test curried versions too', () => {
    const spec = { x: equals(20), z: equals('foo') };
    const test1 = { x: 125, y: 100, z: 100 };
    const test2 = { x: 20, z: 'foo' };

    eq(whereAll(spec)(test1), false);
    eq(whereAll(_, test2)(spec), true);
    eq(whereAll(spec, test2), true);
  });
});
