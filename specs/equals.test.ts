// deno-lint-ignore-file no-explicit-any
import { describe, it } from './_describe.ts';
import { _, equals } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('equals', () => {
  const a: any[] = [];
  const b = a;
  it('should test for deep equality of its operands', () => {
    eq(equals(100, 100), true);
    eq(equals(100, '100'), false);
    eq(equals([], []), true);
    eq(equals(a, b), true);
  });

  it('should consider equal Boolean primitives equal', () => {
    eq(equals(true, true), true);
    eq(equals(false, false), true);
    eq(equals(true, false), false);
    eq(equals(false, true), false);
  });

  it('should consider equivalent Boolean objects equal', () => {
    eq(equals(new Boolean(true), new Boolean(true)), true);
    eq(equals(new Boolean(false), new Boolean(false)), true);
    eq(equals(new Boolean(true), new Boolean(false)), false);
    eq(equals(new Boolean(false), new Boolean(true)), false);
  });

  it('should never consider Boolean primitive equal to Boolean object', () => {
    eq(equals(true, new Boolean(true)), false);
    eq(equals(new Boolean(true), true), false);
    eq(equals(false, new Boolean(false)), false);
    eq(equals(new Boolean(false), false), false);
  });

  it('should consider equal number primitives equal', () => {
    eq(equals(0, 0), true);
    eq(equals(0, 1), false);
    eq(equals(1, 0), false);
  });

  it('should consider equivalent Number objects equal', () => {
    eq(equals(new Number(0), new Number(0)), true);
    eq(equals(new Number(0), new Number(1)), false);
    eq(equals(new Number(1), new Number(0)), false);
  });

  it('should never consider number primitive equal to Number object', () => {
    eq(equals(0, new Number(0)), false);
    eq(equals(new Number(0), 0), false);
  });

  it('should consider equal string primitives equal', () => {
    eq(equals('', ''), true);
    eq(equals('', 'x'), false);
    eq(equals('x', ''), false);
    eq(equals('foo', 'foo'), true);
    eq(equals('foo', 'bar'), false);
    eq(equals('bar', 'foo'), false);
  });

  it('should return the curried version', () => {
    eq(equals(_, '')(''), true);
    eq(equals('')('x'), false);
    eq(equals('x')(''), false);
  });

  it('should consider equivalent String objects equal', () => {
    eq(equals(new String(''), new String('')), true);
    eq(equals(new String(''), new String('x')), false);
    eq(equals(new String('x'), new String('')), false);
    eq(equals(new String('foo'), new String('foo')), true);
    eq(equals(new String('foo'), new String('bar')), false);
    eq(equals(new String('bar'), new String('foo')), false);
  });

  it('should never consider string primitive equal to String object', () => {
    eq(equals('', new String('')), false);
    eq(equals(new String(''), ''), false);
    eq(equals('x', new String('x')), false);
    eq(equals(new String('x'), 'x'), false);
  });

  it('should handle objects', () => {
    eq(equals({}, {}), true);
    eq(equals({ a: 1, b: 2 }, { a: 1, b: 2 }), true);
    eq(equals({ a: 2, b: 3 }, { b: 3, a: 2 }), true);
    eq(equals({ a: 2, b: 3 }, { a: 3, b: 3 }), false);
    eq(equals({ a: 2, b: 3, c: 1 }, { a: 2, b: 3 }), false);
  });

  it('should considers equivalent Arguments objects equal', () => {
    const a = (function () {
      return arguments;
    })();
    const b = (function () {
      return arguments;
    })();
    const c = (function () {
      return arguments;
      // fae-no-check
      // @ts-ignore
    })(1, 2, 3);
    const d = (function () {
      return arguments;
      // fae-no-check
      // @ts-ignore
    })(1, 2, 3);

    eq(equals(a, b), true);
    eq(equals(b, a), true);
    eq(equals(c, d), true);
    eq(equals(d, c), true);
    eq(equals(a, c), false);
    eq(equals(c, a), false);
  });

  it('should consider equivalent Error objects equal', () => {
    eq(equals(new Error('XXX'), new Error('XXX')), true);
    eq(equals(new Error('XXX'), new Error('YYY')), false);
    eq(equals(new Error('XXX'), new TypeError('XXX')), false);
    eq(equals(new Error('XXX'), new TypeError('YYY')), false);
  });

  let supportsSticky = false;
  try {
    RegExp('', 'y');
    supportsSticky = true;
  } catch (_e) {
    // does not support stickyflag
  }

  let supportsUnicode = false;
  try {
    RegExp('', 'u');
    supportsUnicode = true;
  } catch (_e) {
    // does not support Unicode
  }

  it('should handle regex', () => {
    eq(equals(/\s/, /\s/), true);
    eq(equals(/\s/, /\d/), false);
    eq(equals(/a/gi, /a/gi), true);
    eq(equals(/a/gim, /a/gim), true);
    eq(equals(/a/gi, /a/i), false);

    if (supportsSticky) {
      eq(equals(/\s/y, /\s/y), true);
      eq(equals(/a/gimy, /a/gimy), true);
    }

    if (supportsUnicode) {
      eq(equals(/\s/u, /\s/u), true);
      eq(equals(/a/gimu, /a/gimu), true);
    }
  });

  const listA = [1, 2, 3];
  const listB = [1, 3, 2];

  it('should handle lists', () => {
    eq(equals([], {}), false);
    eq(equals(listA, listB), false);
    eq(equals([1, 2, 3], [1, 2, 3]), true);
    eq(equals([1, 2, listA], [1, 2, listA]), true);
    eq(equals([1, 2, listA], [1, 2, listB]), false);
  });

  const c: any = {};
  c.v = c;
  const d: any = {};
  d.v = d;
  const e: any = [];
  e.push(e);
  const f: any = [];
  f.push(f);
  const nestA = { a: [1, 2, { c: 1 }], b: 1 };
  const nestB = { a: [1, 2, { c: 1 }], b: 1 };
  const nestC = { a: [1, 2, { c: 2 }], b: 1 };

  it('should handle recursive data structures', () => {
    eq(equals(c, d), true);
    eq(equals(e, f), true);
    eq(equals(nestA, nestB), true);
    eq(equals(nestA, nestC), false);
  });

  it('should handle dates', () => {
    eq(equals(new Date(0), new Date(0)), true);
    eq(equals(new Date(1), new Date(1)), true);
    eq(equals(new Date(0), new Date(1)), false);
    eq(equals(new Date(1), new Date(0)), false);
  });

  it('should require that both objects have the same enumerable properties with the same values', () => {
    const a1: any = [];
    const a2: any = [];
    a2.x = 0;

    const b1: any = new Boolean(false);
    const b2: any = new Boolean(false);
    b2.x = 0;

    const d1: any = new Date(0);
    const d2: any = new Date(0);
    d2.x = 0;

    const n1: any = new Number(0);
    const n2: any = new Number(0);
    n2.x = 0;

    const r1: any = /(?:)/;
    const r2: any = /(?:)/;
    r2.x = 0;

    const s1: any = new String('');
    const s2: any = new String('');
    s2.x = 0;

    eq(equals(a1, a2), false);
    eq(equals(b1, b2), false);
    eq(equals(d1, d2), false);
    eq(equals(n1, n2), false);
    eq(equals(r1, r2), false);
    eq(equals(s1, s2), false);
  });

  const typArr1 = new ArrayBuffer(10);
  // fae-no-check
  // @ts-ignore
  typArr1[0] = 1;
  const typArr2 = new ArrayBuffer(10);
  // fae-no-check
  // @ts-ignore
  typArr2[0] = 1;
  const typArr3 = new ArrayBuffer(10);
  const intTypArr = new Int8Array(typArr1);
  // fae-no-check
  // @ts-ignore
  typArr3[0] = 0;

  it('should handle typed arrays', () => {
    eq(equals(typArr1, typArr2), true);
    eq(equals(typArr1, typArr3), false);
    eq(equals(typArr1, intTypArr), false);
  });

  it('should compare Promise objects by identity', () => {
    const p = Promise.resolve(42);
    const q = Promise.resolve(42);
    eq(equals(p, p), true);
    eq(equals(p, q), false);
  });

  it('should compare Map objects by value', () => {
    eq(equals(new Map([]), new Map([])), true);
    eq(equals(new Map([]), new Map([[1, 'a']])), false);
    eq(equals(new Map([[1, 'a']]), new Map([])), false);
    eq(equals(new Map([[1, 'a']]), new Map([[1, 'a']])), true);
    // prettier-ignore
    eq(
      equals(new Map([[1, 'a'], [2, 'b']]), new Map([[2, 'b'], [1, 'a']])),
      true,
    );
    eq(equals(new Map([[1, 'a']]), new Map([[2, 'a']])), false);
    eq(equals(new Map([[1, 'a']]), new Map([[1, 'b']])), false);

    const m1 = new Map<number, string | Map<number, string>>([[1, 'a'], [
      2,
      new Map([[3, 'c']]),
    ]]);
    const m2 = new Map<number, string | Map<number, string>>([[1, 'a'], [
      2,
      new Map([[3, 'c']]),
    ]]);
    const m3 = new Map<number, string | Map<number, string>>([[1, 'a'], [
      2,
      new Map([[3, 'd']]),
    ]]);

    eq(
      equals(
        m1,
        m2,
      ),
      true,
    );
    eq(
      equals(
        m1,
        m3,
      ),
      false,
    );
    // prettier-ignore
    eq(
      equals(
        new Map([[[1, 2, 3], [4, 5, 6]]]),
        new Map([[[1, 2, 3], [4, 5, 6]]]),
      ),
      true,
    );
    // prettier-ignore
    eq(
      equals(
        new Map([[[1, 2, 3], [4, 5, 6]]]),
        new Map([[[1, 2, 3], [7, 8, 9]]]),
      ),
      false,
    );
  });

  it('should dispatch to `equals` method recursively in Map', () => {
    const a = new Map();
    const b = new Map();
    a.set(a, a);
    eq(equals(a, b), false);
    a.set(b, b);
    b.set(b, b);
    b.set(a, a);
    eq(equals(a, b), true);
  });

  it('should compare Set objects by value', () => {
    eq(equals(new Set([]), new Set([])), true);
    eq(equals(new Set([]), new Set([1])), false);
    eq(equals(new Set([1]), new Set([])), false);
    eq(equals(new Set([1, 2]), new Set([2, 1])), true);
    eq(
      equals(
        new Set([1, new Set([2, new Set([3])])]),
        new Set([1, new Set([2, new Set([3])])]),
      ),
      true,
    );
    eq(
      equals(
        new Set([1, new Set([2, new Set([3])])]),
        new Set([1, new Set([2, new Set([4])])]),
      ),
      false,
    );
    eq(
      equals(
        new Set([
          [1, 2, 3],
          [4, 5, 6],
        ]),
        new Set([
          [1, 2, 3],
          [4, 5, 6],
        ]),
      ),
      true,
    );
    eq(
      equals(
        new Set([
          [1, 2, 3],
          [4, 5, 6],
        ]),
        new Set([
          [1, 2, 3],
          [7, 8, 9],
        ]),
      ),
      false,
    );
  });

  it('should dispatch to `equals` method recursively in Set', () => {
    const a = new Set();
    const b = new Set();
    a.add(a);
    eq(equals(a, b), false);
    a.add(b);
    b.add(b);
    b.add(a);
    eq(equals(a, b), true);
  });

  it('should compare WeakMap objects by identity', () => {
    const m = new WeakMap([]);
    eq(equals(m, m), true);
    eq(equals(m, new WeakMap([])), false);
  });

  it('should compare WeakSet objects by identity', () => {
    const s = new WeakSet([]);
    eq(equals(s, s), true);
    eq(equals(s, new WeakSet([])), false);
  });

  it('should dispatch to `equals` method recursively', () => {
    class Left {
      private value: any;
      constructor(x: any) {
        this.value = x;
      }

      equals(x: any) {
        return x instanceof Left && equals(x.value, this.value);
      }
    }

    class Right {
      private value: any;
      constructor(x: any) {
        this.value = x;
      }

      equals(x: any) {
        return x instanceof Right && equals(x.value, this.value);
      }
    }

    eq(equals(new Left([42]), new Left([42])), true);
    eq(equals(new Left([42]), new Left([43])), false);
    eq(equals(new Left(42), { value: 42 }), false);
    eq(equals({ value: 42 }, new Left(42)), false);
    eq(equals(new Left(42), new Right(42)), false);
    eq(equals(new Right(42), new Left(42)), false);

    eq(equals([new Left(42)], [new Left(42)]), true);
    eq(equals([new Left(42)], [new Right(42)]), false);
    eq(equals([new Right(42)], [new Left(42)]), false);
    eq(equals([new Right(42)], [new Right(42)]), true);
  });

  it('should commutative', () => {
    class Point {
      protected x: number;
      protected y: number;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }

      equals(point: any) {
        return (
          point instanceof Point &&
          this.x === point.x &&
          this.y === point.y
        );
      }
    }

    class ColorPoint extends Point {
      private color: string;
      constructor(x: number, y: number, color: string) {
        super(x, y);
        this.color = color;
      }

      equals(point: any) {
        return (
          point instanceof ColorPoint &&
          this.x === point.x &&
          this.y === point.y &&
          this.color === point.color
        );
      }
    }

    eq(equals(new Point(2, 2), new ColorPoint(2, 2, 'red')), false);
    eq(equals(new ColorPoint(2, 2, 'red'), new Point(2, 2)), false);
  });
});
