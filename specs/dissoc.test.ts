import { describe, it } from './_describe.ts';
import { _, dissoc } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('dissoc', () => {
  it('should copy an object omitting the specified property', () => {
    eq(dissoc('b', { a: 1, b: 2, c: 3 }), { a: 1, c: 3 });
    eq(dissoc('d', { a: 1, b: 2, c: 3 }), { a: 1, b: 2, c: 3 });
  });

  it('should include prototype properties', () => {
    function Rectangle(this: any, width: number, height: number) {
      this.width = width;
      this.height = height;
    }
    const area = (Rectangle.prototype.area = () => {
      // fae-no-check
      // @ts-ignore
      return this.width * this.height;
    });
    // fae-no-check
    // @ts-ignore
    const rect = new Rectangle(7, 6);

    // @ts-ignore
    eq(dissoc('area', rect), { width: 7, height: 6 });
    // fae-no-check
    // @ts-ignore
    eq(dissoc('width', rect), { height: 6, area: area });
    // fae-no-check
    // @ts-ignore
    eq(dissoc('depth', rect), { width: 7, height: 6, area: area });
  });

  it('should coerce non-string types', () => {
    eq(dissoc(42, { a: 1, b: 2, 42: 3 }), { a: 1, b: 2 });
    // @ts-ignore
    eq(dissoc(null, { a: 1, b: 2, null: 3 }), { a: 1, b: 2 });
    // @ts-ignore
    eq(dissoc(undefined, { a: 1, b: 2, undefined: 3 }), {
      a: 1,
      b: 2,
    });
  });

  it('should work on curried versions too', () => {
    const a = 'b';
    const b = { a: 1, b: 2, c: 3 };
    const expected = { a: 1, c: 3 };

    eq(dissoc(a, b), expected);
    eq(dissoc(a)(b), expected);
    eq(dissoc(_, b)(a), expected);
  });
});
