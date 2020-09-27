import { describe, it } from './_describe.ts'
import { or } from '../mod.ts'
import { eq } from './utils/utils.ts'
import { and } from '../mod.ts'
import { xor } from '../mod.ts'

describe('mutlibool', () => {
  it(' Should solve (a + b) . (c + d. e + (f + g)) ', () => {
    eq(
      and(
        or([], ''),
        or(or(' ', and(false, { a: 31 })), or(true, NaN)),
      ),
      true,
    )
    eq(and(or([], ''), or(or('', and(true, {})), or(false, 0))), true)
  })

  it(' Should solve (a + b) ^ (c + d ^ e + (f + g)) ', () => {
    eq(
      xor(
        or([], ''),
        or(or(' ', xor(false, { a: 31 })), or(true, NaN)),
      ),
      false,
    )
    eq(
      xor(or([], ''), or(or('', xor(false, {})), or(false, 0))),
      false,
    )
  })
})
