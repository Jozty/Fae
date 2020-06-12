import { describe, it } from "./_describe.ts"
import { andThen } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('andThen', () => {
  it('invokes then on the promise with the function passed to it', function() {
    andThen(
      function(n) {
        eq(n, 1)
      },
      Promise.resolve(1)
    )
  })

  it('is not dependent on a particular promise implementation', function() {
    let thennable = {
      then: function(f: any) {
        return f(42)
      }
    }

    let f = function(n: any) {
      eq(n, 42)
    }

    andThen(f, thennable)
  })
})