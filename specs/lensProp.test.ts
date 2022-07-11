import { describe, it } from './_describe.ts';
import { compose, identity, inc, lensProp, over, set, view } from '../mod.ts';
import { eq } from './utils/utils.ts';

const testObj = {
  a: 1,
  b: 2,
  c: 3,
};

type TestObj = typeof testObj & {
  d?: number;
  X?: number;
};

type TestObjEl = TestObj[keyof TestObj];

type Inc = (a: number) => number;

describe('lensProp: view', () => {
  it('should focus object the specified object property', () => {
    eq(view<TestObj, TestObjEl>(lensProp('a'), testObj), 1);
  });

  it('should return undefined if the specified property does not exist', () => {
    eq(view<TestObj, TestObjEl>(lensProp('X'), testObj), undefined);
  });
});

describe('lensProp: set', () => {
  it('should set the value of the object property specified', () => {
    let result = set<TestObj, TestObjEl>(lensProp('a'), 0, testObj);
    eq(result, { a: 0, b: 2, c: 3 });
    // new object
    eq(result == testObj, false);
  });

  it('should add the property to the object if it doesn\'t exist', () => {
    eq(set<TestObj, TestObjEl>(lensProp('d'), 4, testObj), {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    });
  });
});

describe('lensProp: over', () => {
  it('should apply function to the value of the specified object property', () => {
    eq(over<TestObj, number>(lensProp('a'), inc as Inc, testObj), {
      a: 2,
      b: 2,
      c: 3,
    });
  });

  it('should apply function to undefined and adds the property if it doesn\'t exist', () => {
    eq(over<TestObj, TestObjEl>(lensProp('X'), identity, testObj), {
      a: 1,
      b: 2,
      c: 3,
      X: undefined,
    });
  });
});

describe('lensProp: composability', () => {
  it('can be composed', () => {
    const nestedObj = { a: { b: 1 }, c: 2 };
    const composedLens = compose(lensProp('a'), lensProp('b'));

    // TODO
    // deno-lint-ignore no-explicit-any
    eq(view(composedLens as any, nestedObj) as any, 1);
  });
});

describe('lensProp: well behaved lens', () => {
  it('should set s (get s) === s', () => {
    eq(
      set(lensProp('a'), view(lensProp('a'), testObj), testObj),
      testObj,
    );
  });

  it('should get (set s v) === v', () => {
    eq(view(lensProp('a'), set(lensProp('a'), 0, testObj)), 0);
  });

  it('should get (set(set s v1) v2) === v2', () => {
    eq(
      view(
        lensProp('a'),
        set(lensProp('a'), 11, set(lensProp('a'), 10, testObj)),
      ),
      11,
    );
  });
});
