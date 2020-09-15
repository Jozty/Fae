import { describe, it } from "./_describe.ts"
import { dissoc } from '../mod.ts'
import { eq, strictEq } from "./utils/utils.ts"


describe('dissoc', () => {
  it('should copy an object omitting the specified property', () => {
    eq(dissoc('b', {a: 1, b: 2, c: 3}), {a: 1, c: 3})
    eq(dissoc('d', {a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3})
  })

  it('should include prototype properties', () => {
    function Rectangle(this: any, width: number, height: number) {
      this.width = width
      this.height = height
    }
    const area = Rectangle.prototype.area = () => {
      // @ts-ignore
      return this.width * this.height
    }
    // @ts-ignore
    const rect = new Rectangle(7, 6)

    eq(dissoc('area', rect), {width: 7, height: 6})
    eq(dissoc('width', rect), {height: 6, area: area})
    eq(dissoc('depth', rect), {width: 7, height: 6, area: area})
  })

  it('should coerce non-string types', () => {
    eq(dissoc(42, {a: 1, b: 2, 42: 3}), {a: 1, b: 2})
    // @ts-ignore
    eq(dissoc(null, {a: 1, b: 2, 'null': 3}), {a: 1, b: 2})
    // @ts-ignore
    eq(dissoc(undefined, {a: 1, b: 2, undefined: 3}), {a: 1, b: 2})
  })

})
