// @ts-nocheck
// TODO
import { describe, it } from './_describe.ts';
import { compose, lensIndex, over, set, view } from '../mod.ts';
import { eq } from './utils/utils.ts';

type O = {
  a?: number;
  b?: number;
  c?: number;
};

const testList1: (O | number | string[])[] = [
  { a: 1 },
  { b: 2 },
  { c: 3 },
  [''],
];
type TestList1 = typeof testList1;
type TestList1El = TestList1[number];

const testList = testList1;

describe('lensIndex: view', () => {
  it('should focus list element at the specified index', () => {
    eq(view(lensIndex<TestList1, TestList1El>(0), testList), { a: 1 });
  });

  it('should return undefined if the specified index does not exist', () => {
    eq(
      view<TestList1, TestList1El>(lensIndex(10), testList),
      undefined,
    );
  });
});

describe('lensIndex: set', () => {
  it('should set the list value at the specified index', () => {
    eq(set<TestList1, TestList1El>(lensIndex(0), 0, testList), [
      0,
      { b: 2 },
      { c: 3 },
      [''],
    ]);
  });
});

describe('lensIndex: over', () => {
  it('should apply function to the value at the specified list index', () => {
    eq(
      over<TestList1, TestList1El>(
        lensIndex(2),
        Object.keys,
        testList,
      ),
      [{ a: 1 }, { b: 2 }, ['c'], ['']],
    );
    eq(testList, [{ a: 1 }, { b: 2 }, { c: 3 }, ['']]);
  });
});

describe('lensIndex: composability', () => {
  it('can be composed', () => {
    const nestedList = [0, [10, 11, 12], 1, 2];
    const composedLens = compose(lensIndex(1), lensIndex(0));

    eq(view(composedLens, nestedList), 10);
  });
});

describe('lensIndex: well behaved lens', () => {
  it('should set s (get s) === s', () => {
    eq(
      set(lensIndex(0), view(lensIndex(0), testList), testList),
      testList,
    );
  });

  it('should get (set s v) === v', () => {
    eq(view(lensIndex(0), set(lensIndex(0), 0, testList)), 0);
  });

  it('should get (set(set s v1) v2) === v2', () => {
    eq(
      view(
        lensIndex(0),
        set(lensIndex(0), 11, set(lensIndex(0), 10, testList)),
      ),
      11,
    );
  });
});
