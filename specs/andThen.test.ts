import { it, Tests } from './_async.ts'
import { describe, it as itS} from "./_describe.ts"
import {
  andThen,
  compose,
  pipe,
  inc,
} from '../mod.ts'
import { eq, thr } from "./utils/utils.ts"

const tests: Tests = {
  "should invoke then on the promise with the function passed to it": it(
    async (done: Function) => {
      const p = new Promise(resolve => {
        setTimeout(() => {
          resolve(1)
        }, 100)
      })
      andThen(
        function (n) {
          eq(n, 1)
          done()
        },
        p
      )
    }
  ),

  "should flatten promise returning functions": it(
    async (done: Function) => {
      const incAndWrap = compose(Promise.resolve.bind(Promise), inc)
      const asyncAddThree = pipe(incAndWrap, andThen(incAndWrap), andThen(incAndWrap))
  
      andThen((result) => {
        eq(result, 4)
        done()
      })(asyncAddThree(1))
    }
  ),

  "should not dependent on a particular promise implementation": it(
    async (done: Function) => {
      const thennable = {
        then: function(f: Function) {
          return f(42)
        }
      }
  
      const f = function(n: number) {
        eq(n, 42)
        done()
      }
  
      andThen(f, thennable)
    }
  ),
}

describe('andThen', () => {
  itS('throws a typeError if the then method does not exist', () => {
    thr(() => andThen(inc, 1), '`andThen` expected a Promise, received 1')

  })
})

for(let desc in tests) {
  Deno.test(desc, tests[desc])
}
