import { describe, it } from './_describe.ts'
import { or } from '../mod.ts'
import { eq } from './utils/utils.ts'
import { and } from '../mod.ts'
import { xor } from '../mod.ts'

describe('mutlibool', () => {
  it(' Should solve (a + b) . (c + d. e + (f + g)) ', () => {
    const orOpr1 = or([], 1) // (a+b)
    const orOpr2 = or({ 1: 3 }, 'A') // (f+g)
    const andOp1 = and(false, 4) // (d.e)
    const orMulti = or(or(orOpr2, andOp1), NaN) // (c+d.e+(f+g))
    const total = and(orOpr1, orMulti) // (a+b).(c+d.e+(f+g))
    eq(total, true)
  })

  it(' Should solve (a + b) ^ (c + d ^ e + (f + g)) ', () => {
    const orOpr1 = or([], 1) // (a+b)
    const orOpr2 = or({ 1: 3 }, 'A') // (f+g)
    const xorOp1 = xor(false, 4) // (d^e)
    const orMulti = or(or(orOpr2, xorOp1), undefined) // (c+d^e+(f+g))
    const total = xor(orOpr1, orMulti) // (a+b)^(c+d^e+(f+g))
    eq(total, false)
  })
})
