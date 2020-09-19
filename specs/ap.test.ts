import { describe, it } from './_describe.ts'
import { ap, multiply, add } from '../mod.ts'
import { eq } from './utils/utils.ts'
import type { Func } from '../utils/types.ts'

describe('ap', () => {
  const mul2 = multiply(2)
  const add3 = add(3)

  it('should interpret [a] as an applicative', () => {
    eq(ap([mul2, add3], [1, 2, 3]), [2, 4, 6, 4, 5, 6])
  })

  it('should interpret ((->) r) as an applicative', () => {
    const f = function (r: any) {
      return function (a: any) {
        return r + a
      }
    }
    const h = ap(f, mul2) as Func

    eq(h(10), 10 + 10 * 2)

    eq((ap(add)(mul2) as Func)(10), 10 + 10 * 2)
  })

  it("should dispatch to the passed object's ap method when values is a non-Array object", () => {
    const obj = { ap: (n: number) => 'called ap with ' + n }
    eq(ap(obj, 10), obj.ap(10))
  })
})
