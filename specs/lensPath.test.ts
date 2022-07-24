// @ts-nocheck
// TODO
import { describe, it } from './_describe.ts';
import { compose, identity, inc, lensPath, over, set, view } from '../mod.ts';
import { eq } from './utils/utils.ts';

const testObj = {
  a: [
    {
      b: 1,
    },
    {
      b: 2,
    },
  ],
  d: 3,
};

type TestObj = typeof testObj & {
  X?: number;
};
type TestObjEl = TestObj[keyof TestObj] | TestObj;

type Inc = (a: number) => number;

describe('lensPath: view', () => {
  it('should focus the specified object property', () => {
    eq(view<TestObj, TestObjEl>(lensPath(['d']), testObj), 3);
    eq(view<TestObj, TestObjEl>(lensPath(['a', 1, 'b']), testObj), 2);
    eq(view<TestObj, TestObjEl>(lensPath([]), testObj), testObj);
  });
});

describe('lensPath: set', () => {
  it('should set the value of the object property specified', () => {
    eq(set<TestObj, TestObjEl>(lensPath(['d']), 0, testObj), {
      a: [{ b: 1 }, { b: 2 }],
      d: 0,
    });
    eq(set<TestObj, TestObjEl>(lensPath(['a', 0, 'b']), 0, testObj), {
      a: [{ b: 0 }, { b: 2 }],
      d: 3,
    });
    // fae-no-check
    // @ts-ignore
    eq(set<TestObj, TestObjEl>(lensPath([]), 0, testObj), 0);
  });

  it('should add the property to the object if it doesn\'t exist', () => {
    eq(set<TestObj, TestObjEl>(lensPath(['X']), 0, testObj), {
      a: [{ b: 1 }, { b: 2 }],
      d: 3,
      X: 0,
    });
    eq(set<TestObj, TestObjEl>(lensPath(['a', 0, 'X']), 0, testObj), {
      // fae-no-check
      // @ts-ignore
      a: [{ b: 1, X: 0 }, { b: 2 }],
      d: 3,
    });
  });
});

describe('lensPath: over', () => {
  it('should apply function to the value of the specified object property', () => {
    eq(over<TestObj, number>(lensPath(['d']), inc as Inc, testObj), {
      a: [{ b: 1 }, { b: 2 }],
      d: 4,
    });
    eq(
      over<TestObj, number>(
        lensPath(['a', 1, 'b']),
        inc as Inc,
        testObj,
      ),
      {
        a: [{ b: 1 }, { b: 3 }],
        d: 3,
      },
    );
    // TODO:
    // eq(over(lensPath([]), toPairs, testObj), [['a', [{b: 1}, {b: 2}]], ['d', 3]])
  });

  it('should apply function to undefined and adds the property if it doesn\'t exist', () => {
    eq(over<TestObj, number>(lensPath(['X']), identity, testObj), {
      a: [{ b: 1 }, { b: 2 }],
      d: 3,
      X: undefined,
    } as unknown);
    eq(
      over<TestObj, number>(
        lensPath(['a', 0, 'X']),
        identity,
        testObj,
      ),
      {
        // fae-no-check
        // @ts-ignore
        a: [{ b: 1, X: undefined }, { b: 2 }],
        d: 3,
      },
    );
  });
});

describe('lensPath: composability', () => {
  it('can be composed', () => {
    const composedLens = compose(lensPath(['a']), lensPath([1, 'b']));
    eq(view(composedLens, testObj), 2);
  });
});

describe('lensPath: well behaved lens', () => {
  it('should set s (get s) === s', () => {
    eq(
      set(lensPath(['d']), view(lensPath(['d']), testObj), testObj),
      testObj,
    );
    eq(
      set(
        lensPath(['a', 0, 'b']),
        view(lensPath(['a', 0, 'b']), testObj),
        testObj,
      ),
      testObj,
    );
  });

  it('should get (set s v) === v', () => {
    eq(view(lensPath(['d']), set(lensPath(['d']), 0, testObj)), 0);
    eq(
      view(
        lensPath(['a', 0, 'b']),
        set(lensPath(['a', 0, 'b']), 0, testObj),
      ),
      0,
    );
  });

  it('should get (set(set s v1) v2) === v2', () => {
    const p = ['d'];
    const q = ['a', 0, 'b'];
    eq(
      view(
        lensPath(p),
        set(lensPath(p), 11, set(lensPath(p), 10, testObj)),
      ),
      11,
    );
    eq(
      view(
        lensPath(q),
        set(lensPath(q), 11, set(lensPath(q), 10, testObj)),
      ),
      11,
    );
  });
});
