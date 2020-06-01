import { describe, it, expect } from "./_describe.ts"
import { dec } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('dec', () => {
  it('should decrements its argument', () => {
    eq(dec(-1), -2)
    eq(dec(0), -1)
    eq(dec(1), 0)
    eq(dec(1020.34), 1019.34)
    eq(dec(-Infinity), -Infinity)
    eq(dec(Infinity), Infinity)
    eq(dec(NaN), NaN)
  });
})