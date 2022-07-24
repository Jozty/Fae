import { describe, it } from './_describe.ts';
import { _, dissoc } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('dissoc', () => {
  it('should copy an object omitting the specified property', () => {
    eq(dissoc('b', { a: 1, b: 2, c: 3 }), { a: 1, c: 3 });
    eq(dissoc('d', { a: 1, b: 2, c: 3 }), { a: 1, b: 2, c: 3 });
  });

  it('should include prototype properties', () => {
    function Rectangle(this: unknown, width: number, height: number) {
      // @ts-ignore: https://github.com/Jozty/Fae/issues/81
      this.width = width;
      // @ts-ignore: https://github.com/Jozty/Fae/issues/81
      this.height = height;
    }

    const area = (Rectangle.prototype.area = () => {
      // @ts-ignore: https://github.com/Jozty/Fae/issues/81
      return this.width * this.height;
    });

    // @ts-ignore: https://github.com/Jozty/Fae/issues/81
    const rect = new Rectangle(7, 6);

    // @ts-ignore: https://github.com/Jozty/Fae/issues/81
    eq(dissoc('area', rect), { width: 7, height: 6 });

    // @ts-ignore: https://github.com/Jozty/Fae/issues/81
    eq(dissoc('width', rect), { height: 6, area: area });

    // @ts-ignore: https://github.com/Jozty/Fae/issues/81
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
