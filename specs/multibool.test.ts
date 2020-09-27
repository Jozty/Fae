import { describe, it } from './_describe.ts'
import { or } from '../mod.ts'
import { eq } from './utils/utils.ts'
import { and } from '../mod.ts'
import { xor } from '../mod.ts'

describe('mutlibool', () => {
  it(' Should solve (a + b) . (c + d. e + (f + g)) ', () => {
    const orOpr1 = or([], 1)
    const orOpr2 = or({ 1: 3 }, 'A')
    const andOp1 = and(false, 4)
    const orMulti = or(or(orOpr2, andOp1), NaN)
    const total = and(orOpr1, orMulti)
    eq(total, true)
  })

  it(' Should solve (a + b) ^ (c + d ^ e + (f + g)) ', () => {
    const orOpr1 = or([], 1)
    const orOpr2 = or({ 1: 3 }, 'A')
    const xorOp1 = xor(false, 4)
    const orMulti = or(or(orOpr2, xorOp1), undefined)
    const total = xor(orOpr1, orMulti)
    eq(total, false)
  })
})
