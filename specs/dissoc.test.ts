import { describe, it } from './_describe.ts';
import { _, dissoc } from '../mod.ts';
import { eq, exactType } from './utils/utils.ts';

describe('dissoc', () => {
  const given = { a: 1, b: 2, c: 3 };
  const exptectedOmitB = { a: 1, c: 3 };
  it('should copy an object omitting the specified property', () => {
    eq(dissoc('b', given), exptectedOmitB);

    // @ts-expect-error: property d does not exist
    eq(dissoc('d', given), given);
  });

  it('should include prototype properties', () => {
    interface RectInterface {
      width: number;
      height: number;
      area: () => number;
    }

    const Rectangle = function (
      this: RectInterface,
      width: number,
      height: number,
    ) {
      this.width = width;
      this.height = height;
    } as unknown as { new (width: number, height: number): RectInterface };

    const area = (Rectangle.prototype.area = function (this: RectInterface) {
      return this.width * this.height;
    });

    const rect: RectInterface = new Rectangle(7, 6);

    eq(dissoc('area', rect), { width: 7, height: 6 });

    eq(dissoc('width', rect), { height: 6, area: area });

    // @ts-expect-error: 'depth' doesn't exist of type R
    eq(dissoc('depth', rect), { width: 7, height: 6, area: area });
  });

  it('should inherit lower property in prototype chain if deleted', () => {
    const number0 = 4;

    eq(number0.toString(), '4');
    eq(number0.toString, Number.prototype.toString);

    const number1 = dissoc('toString', number0);

    eq(number1.toString(), '[object Object]');
    eq(number1.toString, Object.prototype.toString);
  });

  it('should omit key types of the dissoced prop', () => {
    eq(dissoc('b', given), exptectedOmitB);

    exactType(dissoc('b', given), exptectedOmitB);
    // @ts-expect-error: b is omitted
    exactType(dissoc('b', given), { a: 1, c: 3, b: 2 });

    // @ts-expect-error: property d does not exist
    exactType(dissoc('d', given), exptectedOmitB);

    // @ts-expect-error: b is omitted
    exactType(dissoc('b')(given), { a: 1, c: 3, b: 2 });

    // @ts-expect-error: b is omitted
    exactType(dissoc(_, given)('b'), { a: 1, c: 3, b: 2 });
  });

  it('should coerce non-string types', () => {
    eq(dissoc(42, { a: 1, b: 2, 42: 3 }), { a: 1, b: 2 });
    // @ts-ignore
    eq(dissoc(null, { a: 1, b: 2, null: 3 }), { a: 1, b: 2 });

    // @ts-expect-error: undefined is not a valid prop
    eq(dissoc(undefined, { a: 1, b: 2, undefined: 3 }), {
      // @ts-ignore: undefined is not a valid prop
      a: 1,
      b: 2,
    });
  });

  it('should work on curried versions too', () => {
    const a = 'b';
    const b = given;

    eq(dissoc(a, b), exptectedOmitB);
    eq(dissoc(a)(b), exptectedOmitB);
    eq(dissoc(_, b)(a), exptectedOmitB);
  });
});
